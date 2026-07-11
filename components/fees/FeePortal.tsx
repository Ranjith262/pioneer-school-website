"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SubmitButton } from "@/components/ui/Button";
import type { FeeItem, FeeTransaction, Student } from "@/lib/fees/types";

/** Razorpay's checkout.js global — loaded on demand when a payment starts. */
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

interface OrderResponse {
  orderId: string;
  amountPaise: number;
  currency: string;
  keyId: string;
  mock: boolean;
  studentName: string;
}

const inr = (paise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(paise / 100);

function loadCheckoutScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });
}

export function FeePortal() {
  const { t } = useLanguage();

  const [admissionNo, setAdmissionNo] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [looking, setLooking] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [mockOrder, setMockOrder] = useState<OrderResponse | null>(null);
  const [receipt, setReceipt] = useState<{
    txn: FeeTransaction;
    items: FeeItem[];
  } | null>(null);

  const totalPaise = fees
    .filter((f) => selected.has(f.id))
    .reduce((sum, f) => sum + f.amountPaise, 0);

  const lookup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLooking(true);
      setStudent(null);
      setFees([]);
      setReceipt(null);
      try {
        const res = await fetch(
          `/api/fees?admission=${encodeURIComponent(admissionNo)}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? t("pages.fees.errorGeneric"));
          return;
        }
        setStudent(data.student);
        setFees(data.fees);
        setSelected(new Set(data.fees.map((f: FeeItem) => f.id)));
      } catch {
        setError(t("pages.fees.errorGeneric"));
      } finally {
        setLooking(false);
      }
    },
    [admissionNo, t]
  );

  const toggleFee = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const finishPayment = useCallback(
    async (orderId: string, paymentId: string, signature: string) => {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t("pages.fees.errorGeneric"));
        return;
      }
      const paidItems = fees.filter((f) => selected.has(f.id));
      setReceipt({ txn: data.transaction, items: paidItems });
      setFees((prev) => prev.filter((f) => !selected.has(f.id)));
      setSelected(new Set());
      setMockOrder(null);
    },
    [fees, selected, t]
  );

  const startPayment = useCallback(async () => {
    if (!student || selected.size === 0) return;
    setError("");
    setPaying(true);
    try {
      const res = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admissionNo: student.admissionNo,
          feeIds: [...selected],
        }),
      });
      const order: OrderResponse & { error?: string } = await res.json();
      if (!res.ok) {
        setError(order.error ?? t("pages.fees.errorGeneric"));
        return;
      }

      if (order.mock) {
        // Test mode — simulated UPI sheet instead of the live checkout.
        setMockOrder(order);
        return;
      }

      await loadCheckoutScript();
      const rzp = new window.Razorpay!({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amountPaise,
        currency: order.currency,
        name: "Pioneer Public School",
        description: t("pages.fees.title"),
        handler: (resp: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) =>
          finishPayment(
            resp.razorpay_order_id,
            resp.razorpay_payment_id,
            resp.razorpay_signature
          ),
        // UPI only: hide cards/netbanking/wallets so no fee-bearing
        // method can be used by accident.
        config: {
          display: {
            blocks: {
              upi: {
                name: "UPI",
                instruments: [{ method: "upi" }],
              },
            },
            sequence: ["block.upi"],
            preferences: { show_default_blocks: false },
          },
        },
        theme: { color: "#0057b8" },
      });
      rzp.open();
    } catch {
      setError(t("pages.fees.errorGeneric"));
    } finally {
      setPaying(false);
    }
  }, [student, selected, t, finishPayment]);

  const approveMock = useCallback(() => {
    if (!mockOrder) return;
    finishPayment(
      mockOrder.orderId,
      `pay_mock_${Date.now()}`,
      "mock"
    );
  }, [mockOrder, finishPayment]);

  /* ── Receipt view ── */
  if (receipt) {
    return (
      <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-50 text-2xl"
          >
            ✓
          </span>
          <div>
            <h2 className="text-2xl font-bold text-ink">
              {t("pages.fees.receiptTitle")}
            </h2>
            <p className="text-sm text-muted">{t("pages.fees.receiptDesc")}</p>
          </div>
        </div>

        <dl className="mt-8 space-y-3 rounded-xl bg-surface p-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t("pages.fees.receiptTxn")}</dt>
            <dd className="font-mono font-medium text-ink">{receipt.txn.id}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t("pages.fees.receiptPayment")}</dt>
            <dd className="font-mono font-medium text-ink">
              {receipt.txn.razorpayPaymentId}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t("pages.fees.receiptDate")}</dt>
            <dd className="font-medium text-ink">
              {new Date(receipt.txn.paidAt ?? Date.now()).toLocaleString("en-IN")}
            </dd>
          </div>
        </dl>

        <h3 className="mt-6 font-heading font-semibold text-ink">
          {t("pages.fees.receiptItems")}
        </h3>
        <ul className="mt-2 divide-y divide-primary-50 text-sm">
          {receipt.items.map((f) => (
            <li key={f.id} className="flex justify-between gap-4 py-2.5">
              <span className="text-muted">{f.label}</span>
              <span className="font-medium text-ink">{inr(f.amountPaise)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4 py-2.5 font-semibold text-ink">
            <span>{t("pages.fees.total")}</span>
            <span>{inr(receipt.txn.amountPaise)}</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setReceipt(null)}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-700"
        >
          {t("pages.fees.payMore")}
        </button>
      </div>
    );
  }

  /* ── Mock UPI sheet (test mode) ── */
  if (mockOrder) {
    return (
      <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
        <h2 className="text-2xl font-bold text-ink">{t("pages.fees.mockTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("pages.fees.mockDesc")}</p>

        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl bg-surface p-8">
          <svg
            aria-hidden="true"
            viewBox="0 0 21 21"
            className="h-40 w-40 rounded-lg bg-white p-2 shadow-soft"
          >
            {/* Decorative QR-style pattern — placeholder for the real
                dynamic QR Razorpay renders in live mode. */}
            {[
              [0,0],[1,0],[2,0],[4,0],[6,0],[14,0],[16,0],[18,0],[19,0],[20,0],
              [0,1],[6,1],[8,1],[10,1],[12,1],[14,1],[20,1],
              [0,2],[2,2],[3,2],[4,2],[6,2],[9,2],[11,2],[14,2],[16,2],[17,2],[18,2],[20,2],
              [0,4],[2,4],[3,4],[4,4],[6,4],[8,4],[12,4],[14,4],[16,4],[17,4],[18,4],[20,4],
              [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[8,6],[10,6],[12,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],
              [1,8],[3,8],[5,8],[8,8],[9,8],[13,8],[15,8],[18,8],
              [0,10],[2,10],[4,10],[6,10],[7,10],[10,10],[11,10],[14,10],[17,10],[19,10],
              [1,12],[3,12],[6,12],[9,12],[12,12],[15,12],[16,12],[20,12],
              [0,14],[1,14],[2,14],[4,14],[6,14],[8,14],[11,14],[13,14],[16,14],[18,14],
              [0,16],[6,16],[8,16],[10,16],[13,16],[15,16],[17,16],[19,16],
              [0,17],[2,17],[3,17],[4,17],[6,17],[9,17],[12,17],[14,17],[18,17],[20,17],
              [0,18],[2,18],[3,18],[4,18],[6,18],[8,18],[10,18],[13,18],[16,18],[19,18],
              [0,20],[1,20],[2,20],[3,20],[4,20],[5,20],[6,20],[9,20],[11,20],[14,20],[17,20],[20,20],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1a2433" />
            ))}
          </svg>
          <p className="font-mono text-sm font-semibold text-ink">
            pioneerschool.fees@okhdfcbank
          </p>
          <p className="font-display text-3xl font-medium text-primary">
            {inr(mockOrder.amountPaise)}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={approveMock}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-secondary-700"
          >
            {t("pages.fees.mockApprove")}
          </button>
          <button
            type="button"
            onClick={() => setMockOrder(null)}
            className="inline-flex items-center justify-center rounded-full border border-primary-100 px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            {t("pages.fees.mockCancel")}
          </button>
        </div>
      </div>
    );
  }

  /* ── Lookup + pending fees ── */
  return (
    <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
      <h2 className="text-2xl font-bold text-ink">{t("pages.fees.lookupTitle")}</h2>

      <form onSubmit={lookup} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="admission-no"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            {t("pages.fees.lookupLabel")}
          </label>
          <input
            id="admission-no"
            type="text"
            value={admissionNo}
            onChange={(e) => setAdmissionNo(e.target.value)}
            placeholder={t("pages.fees.lookupPlaceholder")}
            required
            autoComplete="off"
            className="w-full rounded-xl border border-primary-100 bg-white px-4 py-3 text-base uppercase text-ink placeholder:normal-case placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
          />
        </div>
        <SubmitButton disabled={looking}>
          {looking ? t("pages.fees.lookupChecking") : t("pages.fees.lookupButton")}
        </SubmitButton>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {student && (
        <div className="mt-8">
          <div className="rounded-xl bg-primary-50 p-5 text-sm">
            <p className="font-heading text-base font-semibold text-ink">
              {student.name}{" "}
              <span className="font-body text-sm font-normal text-muted">
                ({student.admissionNo})
              </span>
            </p>
            <p className="mt-1 text-muted">
              {t("pages.fees.classLabel")}: {student.className} {student.section} ·{" "}
              {t("pages.fees.parentLabel")}: {student.parentName} ·{" "}
              {t("pages.fees.phoneHint")} ••{student.phoneLast4}
            </p>
          </div>

          {fees.length === 0 ? (
            <p className="mt-6 rounded-xl bg-secondary-50 px-4 py-3 text-sm font-medium text-secondary-700">
              {t("pages.fees.noPending")}
            </p>
          ) : (
            <>
              <h3 className="mt-8 font-heading text-lg font-semibold text-ink">
                {t("pages.fees.pendingTitle")}
              </h3>
              <ul className="mt-3 space-y-3">
                {fees.map((fee) => (
                  <li key={fee.id}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors",
                        selected.has(fee.id)
                          ? "border-primary bg-primary-50/50"
                          : "border-primary-100 hover:bg-surface"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(fee.id)}
                        onChange={() => toggleFee(fee.id)}
                        className="h-5 w-5 accent-[#0057b8]"
                      />
                      <span className="flex-1">
                        <span className="block font-medium text-ink">{fee.label}</span>
                        <span className="block text-xs text-muted">
                          {t("pages.fees.due")}:{" "}
                          {new Date(fee.dueDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          · {fee.academicYear}
                        </span>
                      </span>
                      <span className="font-heading font-semibold text-ink">
                        {inr(fee.amountPaise)}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-primary-50 pt-5">
                <p className="text-lg font-semibold text-ink">
                  {t("pages.fees.total")}:{" "}
                  <span className="font-display text-2xl text-primary">
                    {inr(totalPaise)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={startPayment}
                  disabled={paying || selected.size === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {paying ? t("pages.fees.paying") : t("pages.fees.payButton")}
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                {t("pages.fees.upiNote")}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
