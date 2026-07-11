import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findTransactionByOrderId, markTransactionPaid } from "@/lib/fees/store";
import { verifyCheckoutSignature } from "@/lib/payments/razorpay";

const bodySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

/**
 * POST /api/payments/verify — called by the browser after checkout
 * succeeds. Verifies the HMAC signature before trusting the payment.
 * The webhook is the authoritative confirmation; this gives the parent
 * an immediate receipt.
 */
export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const valid = verifyCheckoutSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });
  if (!valid) {
    return NextResponse.json(
      { error: "Payment signature verification failed." },
      { status: 400 }
    );
  }

  const existing = await findTransactionByOrderId(razorpay_order_id);
  if (!existing) {
    return NextResponse.json({ error: "Unknown order." }, { status: 404 });
  }

  const txn = await markTransactionPaid(razorpay_order_id, razorpay_payment_id);
  return NextResponse.json({ transaction: txn });
}
