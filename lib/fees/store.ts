import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { FeeItem, FeeTransaction, Student } from "@/lib/fees/types";

/**
 * Dummy fee store — JSON seed file + best-effort writes.
 *
 * data/fees.json is the read-only seed (students + fee items).
 * Mutations (paid flags, transactions) are written to data/runtime/,
 * falling back to module memory where the filesystem is read-only
 * (Vercel lambdas). Good enough for the dummy phase; the real student
 * DB replaces this file wholesale — API routes and UI only touch the
 * exported functions.
 */

const SEED_PATH = path.join(process.cwd(), "data", "fees.json");
const RUNTIME_DIR = path.join(process.cwd(), "data", "runtime");
const TXN_PATH = path.join(RUNTIME_DIR, "transactions.json");
const PAID_PATH = path.join(RUNTIME_DIR, "paid-fees.json");

interface SeedData {
  students: Student[];
  fees: FeeItem[];
}

// In-memory fallbacks (authoritative when FS writes fail).
let memTransactions: FeeTransaction[] | null = null;
let memPaidFees: Record<string, string> | null = null; // feeId → transactionId

async function readSeed(): Promise<SeedData> {
  const raw = await fs.readFile(SEED_PATH, "utf8");
  return JSON.parse(raw) as SeedData;
}

async function readJsonOr<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonBestEffort(file: string, value: unknown): Promise<void> {
  try {
    await fs.mkdir(RUNTIME_DIR, { recursive: true });
    await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
  } catch {
    // Read-only filesystem (serverless) — memory copy remains authoritative.
  }
}

async function getPaidMap(): Promise<Record<string, string>> {
  if (!memPaidFees) memPaidFees = await readJsonOr(PAID_PATH, {});
  return memPaidFees;
}

async function getTransactions(): Promise<FeeTransaction[]> {
  if (!memTransactions) memTransactions = await readJsonOr(TXN_PATH, []);
  return memTransactions;
}

export async function findStudent(admissionNo: string): Promise<Student | null> {
  const { students } = await readSeed();
  const needle = admissionNo.trim().toUpperCase();
  return students.find((s) => s.admissionNo.toUpperCase() === needle) ?? null;
}

/** Pending fee items for a student, with paid overlay applied. */
export async function getPendingFees(admissionNo: string): Promise<FeeItem[]> {
  const { fees } = await readSeed();
  const paid = await getPaidMap();
  const needle = admissionNo.trim().toUpperCase();
  return fees
    .filter((f) => f.admissionNo.toUpperCase() === needle)
    .map((f) =>
      paid[f.id]
        ? { ...f, status: "PAID" as const, paidTransactionId: paid[f.id] }
        : f
    )
    .filter((f) => f.status === "PENDING");
}

/** Fee items by id, pending only — validates a payment request server-side. */
export async function getPayableFees(
  admissionNo: string,
  feeIds: string[]
): Promise<FeeItem[]> {
  const pending = await getPendingFees(admissionNo);
  const wanted = new Set(feeIds);
  return pending.filter((f) => wanted.has(f.id));
}

export async function createTransaction(input: {
  admissionNo: string;
  feeIds: string[];
  amountPaise: number;
  razorpayOrderId: string;
}): Promise<FeeTransaction> {
  const txns = await getTransactions();
  const txn: FeeTransaction = {
    id: `txn_${randomUUID()}`,
    status: "CREATED",
    method: "upi",
    createdAt: new Date().toISOString(),
    ...input,
  };
  txns.push(txn);
  await writeJsonBestEffort(TXN_PATH, txns);
  return txn;
}

export async function findTransactionByOrderId(
  razorpayOrderId: string
): Promise<FeeTransaction | null> {
  const txns = await getTransactions();
  return txns.find((t) => t.razorpayOrderId === razorpayOrderId) ?? null;
}

/**
 * Mark a transaction paid and flag its fee items. Idempotent — the
 * webhook and the browser verify call can both land; the second is a no-op.
 */
export async function markTransactionPaid(
  razorpayOrderId: string,
  razorpayPaymentId: string
): Promise<FeeTransaction | null> {
  const txns = await getTransactions();
  const txn = txns.find((t) => t.razorpayOrderId === razorpayOrderId);
  if (!txn) return null;
  if (txn.status === "PAID") return txn;

  txn.status = "PAID";
  txn.razorpayPaymentId = razorpayPaymentId;
  txn.paidAt = new Date().toISOString();
  await writeJsonBestEffort(TXN_PATH, txns);

  const paid = await getPaidMap();
  for (const feeId of txn.feeIds) paid[feeId] = txn.id;
  await writeJsonBestEffort(PAID_PATH, paid);

  return txn;
}
