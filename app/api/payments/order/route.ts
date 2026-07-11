import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findStudent, getPayableFees, createTransaction } from "@/lib/fees/store";
import { createUpiOrder, isMockMode, publicKeyId } from "@/lib/payments/razorpay";

const bodySchema = z.object({
  admissionNo: z.string().trim().min(5),
  feeIds: z.array(z.string().min(1)).min(1).max(20),
});

/**
 * POST /api/payments/order — creates a Razorpay order for the selected
 * pending fees. Amount is computed server-side from the fee store;
 * the client never supplies an amount.
 */
export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { admissionNo, feeIds } = parsed.data;

  const student = await findStudent(admissionNo);
  if (!student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  const payable = await getPayableFees(student.admissionNo, feeIds);
  if (payable.length !== feeIds.length) {
    return NextResponse.json(
      { error: "One or more selected fees are no longer pending. Refresh and try again." },
      { status: 409 }
    );
  }

  const amountPaise = payable.reduce((sum, f) => sum + f.amountPaise, 0);
  const order = await createUpiOrder(amountPaise, `rcpt_${Date.now()}`, {
    admissionNo: student.admissionNo,
    student: student.name,
    fees: payable.map((f) => f.label).join(", ").slice(0, 250),
  });

  await createTransaction({
    admissionNo: student.admissionNo,
    feeIds,
    amountPaise,
    razorpayOrderId: order.orderId,
  });

  return NextResponse.json({
    orderId: order.orderId,
    amountPaise,
    currency: order.currency,
    keyId: publicKeyId(),
    mock: isMockMode(),
    studentName: student.name,
  });
}
