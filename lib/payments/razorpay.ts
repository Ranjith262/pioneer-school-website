import Razorpay from "razorpay";
import { createHmac, randomUUID, timingSafeEqual } from "crypto";

/**
 * Razorpay server-side helpers.
 *
 * Runs in MOCK mode until real keys land in .env.local: order creation
 * and signature checks are simulated so the whole fee-payment loop can
 * be exercised end-to-end without a Razorpay account. Replacing the
 * placeholder keys with live "rzp_live_/rzp_test_" credentials flips
 * everything to the real API automatically — no code change.
 */

const KEY_ID = process.env.RAZORPAY_KEY_ID ?? "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? "";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

export function isMockMode(): boolean {
  return !KEY_ID || !KEY_SECRET || KEY_ID.includes("dummy");
}

/** Key id is public (used by the browser checkout) — never the secret. */
export function publicKeyId(): string {
  return KEY_ID;
}

let client: Razorpay | null = null;
function getClient(): Razorpay {
  if (!client) {
    client = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
  }
  return client;
}

export interface CreatedOrder {
  orderId: string;
  amountPaise: number;
  currency: "INR";
  mock: boolean;
}

export async function createUpiOrder(
  amountPaise: number,
  receiptId: string,
  notes: Record<string, string>
): Promise<CreatedOrder> {
  if (isMockMode()) {
    return {
      orderId: `order_mock_${randomUUID().slice(0, 12)}`,
      amountPaise,
      currency: "INR",
      mock: true,
    };
  }
  const order = await getClient().orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: receiptId,
    notes,
  });
  return {
    orderId: order.id,
    amountPaise,
    currency: "INR",
    mock: false,
  };
}

function safeEqualHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/**
 * Checkout handler signature: HMAC-SHA256(order_id + "|" + payment_id)
 * keyed with the API secret. In mock mode the client sends the literal
 * signature "mock" with a mock order id.
 */
export function verifyCheckoutSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (isMockMode()) {
    return params.orderId.startsWith("order_mock_") && params.signature === "mock";
  }
  const expected = createHmac("sha256", KEY_SECRET)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");
  return safeEqualHex(expected, params.signature);
}

/** Webhook signature: HMAC-SHA256 of the raw body, keyed with the webhook secret. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (isMockMode()) return signature === "mock";
  if (!WEBHOOK_SECRET) return false;
  const expected = createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  return safeEqualHex(expected, signature);
}
