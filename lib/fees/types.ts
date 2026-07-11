/**
 * Fee payment domain types.
 *
 * The store behind these (lib/fees/store.ts) is a JSON file with dummy
 * data for now — it will be swapped for the school's real student DB
 * once access is provided. Keep every consumer on these interfaces so
 * that swap touches one file only.
 */

export interface Student {
  /** Public lookup key parents already know, e.g. "PPS-2025-014". */
  admissionNo: string;
  name: string;
  className: string;
  section: string;
  parentName: string;
  /** Last 4 digits shown for confirmation; full number never leaves the server. */
  phoneLast4: string;
}

export type FeeStatus = "PENDING" | "PAID";

export interface FeeItem {
  id: string;
  admissionNo: string;
  /** e.g. "Tuition Fee — Term 2", "Transport Fee — Q3" */
  label: string;
  /** Amount in paise (₹1 = 100 paise) — integers only, no float money. */
  amountPaise: number;
  dueDate: string; // ISO date
  academicYear: string;
  status: FeeStatus;
  /** Set when paid. */
  paidTransactionId?: string;
}

export type TransactionStatus = "CREATED" | "PAID" | "FAILED";

export interface FeeTransaction {
  id: string;
  admissionNo: string;
  feeIds: string[];
  amountPaise: number;
  /** Razorpay order id (order_...) or mock order id in test mode. */
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: TransactionStatus;
  method: "upi";
  createdAt: string; // ISO datetime
  paidAt?: string;
}
