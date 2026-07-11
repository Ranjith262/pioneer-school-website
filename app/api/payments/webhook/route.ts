import { NextRequest, NextResponse } from "next/server";
import { markTransactionPaid } from "@/lib/fees/store";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";

/**
 * POST /api/payments/webhook — Razorpay server-to-server confirmation.
 * Authoritative payment record: fires even if the parent closes the
 * browser mid-checkout. Configure in the Razorpay dashboard with the
 * event "payment.captured" and set RAZORPAY_WEBHOOK_SECRET to match.
 *
 * Signature covers the raw body, so the body must be read as text
 * before parsing.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    if (payment?.order_id && payment.id) {
      // Idempotent — no-op if the browser verify call already landed.
      await markTransactionPaid(payment.order_id, payment.id);
    }
  }

  // Always 200 for recognised-but-ignored events so Razorpay stops retrying.
  return NextResponse.json({ received: true });
}
