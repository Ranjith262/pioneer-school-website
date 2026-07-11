import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { FeePortal } from "@/components/fees/FeePortal";
import { isMockMode } from "@/lib/payments/razorpay";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Fee Payment",
  description:
    "Pay Pioneer Public School fees securely online by UPI — check pending fees with your child's admission number and pay by UPI ID or QR code.",
  alternates: { canonical: "/fees" },
};

export default function FeesPage() {
  const mock = isMockMode();

  return (
    <>
      <PageHero
        title={<T k="pages.fees.title" />}
        description={<T k="pages.fees.description" />}
        crumbs={[{ label: <T k="pages.fees.crumb" /> }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="mx-auto max-w-3xl">
          {mock && (
            <FadeIn>
              <p className="mb-6 rounded-xl border border-dashed border-accent bg-accent-50 px-5 py-3.5 text-sm font-medium text-ink">
                <span aria-hidden="true">🧪</span>{" "}
                <T k="pages.fees.mockBanner" />
              </p>
            </FadeIn>
          )}
          <FadeIn delay={0.05}>
            <FeePortal />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
