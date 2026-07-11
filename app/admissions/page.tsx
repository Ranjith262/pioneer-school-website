import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { VisitForm } from "@/components/forms/VisitForm";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Admissions open for 2026–27 at Pioneer Public School, Bhagyanagar, Koppal — Nursery to Class 10. Process, eligibility, documents, FAQs, and online enquiry.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title={<T k="pages.admissions.title" />}
        description={<T k="pages.admissions.description" />}
        crumbs={[{ label: <T k="pages.admissions.crumb" /> }]}
      />

      {/* Process */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={<T k="pages.admissions.process.eyebrow" />}
            title={<T k="pages.admissions.process.title" />}
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="relative h-full rounded-card bg-white p-8 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                    <T k={`pages.admissions.process.steps.${i}.title`} />
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    <T k={`pages.admissions.process.steps.${i}.description`} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* Eligibility & documents */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-card bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.admissions.eligibility.title" />
              </h2>
              <table className="mt-6 w-full text-left">
                <thead>
                  <tr className="border-b border-primary-100 text-sm uppercase tracking-wider text-muted">
                    <th scope="col" className="pb-3 font-semibold">
                      <T k="pages.admissions.eligibility.gradeHeader" />
                    </th>
                    <th scope="col" className="pb-3 font-semibold">
                      <T k="pages.admissions.eligibility.ageHeader" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <tr key={i} className="border-b border-primary-50">
                      <th scope="row" className="py-3.5 pr-4 font-heading font-semibold text-ink">
                        <T k={`pages.admissions.eligibility.items.${i}.grade`} />
                      </th>
                      <td className="py-3.5 text-muted">
                        <T k={`pages.admissions.eligibility.items.${i}.age`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-card bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.admissions.documents.title" />
              </h2>
              <ul className="mt-6 space-y-3">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-0.5 text-secondary">✓</span>
                    <T k={`pages.admissions.documents.items.${i}`} />
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* Fee information */}
      <section className="py-16 sm:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-card border border-dashed border-accent bg-accent-50 p-10 text-center">
              <span aria-hidden="true" className="text-4xl">💰</span>
              <h2 className="mt-4 text-2xl font-bold text-ink">
                <T k="pages.admissions.fee.title" />
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                <T k="pages.admissions.fee.text" />
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* FAQs */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={<T k="pages.admissions.faq.eyebrow" />}
            title={<T k="pages.admissions.faq.title" />}
          />
          <FadeIn className="mx-auto max-w-3xl">
            <Accordion
              items={[0, 1, 2, 3, 4, 5].map((i) => ({
                question: <T k={`pages.admissions.faq.items.${i}.question`} />,
                answer: <T k={`pages.admissions.faq.items.${i}.answer`} />,
              }))}
            />
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* Apply + Visit forms */}
      <section id="apply" className="scroll-mt-24 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.admissions.enquiryForm.title" />
              </h2>
              <p className="mt-2 text-muted">
                <T k="pages.admissions.enquiryForm.description" />
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div id="visit" className="scroll-mt-24 rounded-card bg-white p-8 shadow-lift sm:p-10">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.admissions.visitForm.title" />
              </h2>
              <p className="mt-2 text-muted">
                <T k="pages.admissions.visitForm.description" />
              </p>
              <div className="mt-8">
                <VisitForm />
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
