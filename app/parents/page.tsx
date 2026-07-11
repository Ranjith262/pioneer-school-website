import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Parents",
  description:
    "Parent resources at Pioneer Public School — holiday calendar, exam schedules, timetables, circulars, transport, and homework guidelines.",
  alternates: { canonical: "/parents" },
};

const resourceEmojis = ["📅", "📝", "⏰", "📄", "🚌", "📚"];

export default function ParentsPage() {
  return (
    <>
      <PageHero
        title={<T k="pages.parents.title" />}
        description={<T k="pages.parents.description" />}
        crumbs={[{ label: <T k="pages.parents.crumb" /> }]}
      />

      {/* Resources */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={<T k="pages.parents.resources.eyebrow" />}
            title={<T k="pages.parents.resources.title" />}
            description={<T k="pages.parents.resources.description" />}
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-card bg-white p-8 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
                  <span aria-hidden="true" className="text-4xl">{resourceEmojis[i]}</span>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-ink">
                    <T k={`pages.parents.resources.items.${i}.title`} />
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    <T k={`pages.parents.resources.items.${i}.description`} />
                  </p>
                  <p className="mt-4 rounded-xl bg-surface px-4 py-2.5 text-xs font-medium text-muted">
                    <T k={`pages.parents.resources.items.${i}.status`} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* Parent portal (future) */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-card border border-dashed border-primary/40 bg-white p-10 text-center shadow-soft">
              <span aria-hidden="true" className="text-4xl">🔐</span>
              <h2 className="mt-4 text-2xl font-bold text-ink">
                <T k="pages.parents.portal.title" />
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                <T k="pages.parents.portal.text" />
              </p>
              <p className="mt-6">
                <Link href="/contact" className="font-semibold text-primary hover:underline">
                  <T k="common.contactOffice" /> →
                </Link>
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
