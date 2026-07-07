import type { Metadata } from "next";
import { admissionFaqs } from "@/content/faqs";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { VisitForm } from "@/components/forms/VisitForm";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Admissions open for 2026–27 at Pioneer Public School, Koppal — Nursery to Class 10. Process, eligibility, documents, FAQs, and online enquiry.",
  alternates: { canonical: "/admissions" },
};

const processSteps = [
  {
    step: "1",
    title: "Enquire",
    description: "Submit the enquiry form below or visit the school office.",
  },
  {
    step: "2",
    title: "Visit the Campus",
    description: "Tour our classrooms, labs, and grounds — meet our teachers.",
  },
  {
    step: "3",
    title: "Interaction",
    description: "A friendly readiness interaction for Classes 1–9 (no test for pre-primary).",
  },
  {
    step: "4",
    title: "Confirm Admission",
    description: "Submit documents, complete the fee formalities, and welcome aboard!",
  },
];

const eligibility = [
  { grade: "Nursery", age: "3+ years as of June 1" },
  { grade: "LKG", age: "4+ years as of June 1" },
  { grade: "UKG", age: "5+ years as of June 1" },
  { grade: "Class 1", age: "6+ years as of June 1" },
  { grade: "Classes 2–9", age: "Age appropriate to grade, with previous school records" },
];

const documents = [
  "Birth certificate (original + photocopy)",
  "Transfer certificate — for Class 1 and above",
  "Previous year's report card",
  "Aadhaar card copies (child and parents)",
  "Caste / income certificate, if applicable",
  "Four passport-size photographs of the child",
  "Two passport-size photographs of each parent",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions 2026–27"
        description="Join the Pioneer family — admissions are open from Nursery to Class 10. Seats are limited."
        crumbs={[{ label: "Admissions" }]}
      />

      {/* Process */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="A Simple, Transparent Admission Process"
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative h-full rounded-card bg-white p-8 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Eligibility & documents */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-card bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Age Eligibility</h2>
              <table className="mt-6 w-full text-left">
                <thead>
                  <tr className="border-b border-primary-100 text-sm uppercase tracking-wider text-muted">
                    <th scope="col" className="pb-3 font-semibold">Grade</th>
                    <th scope="col" className="pb-3 font-semibold">Age Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibility.map((row) => (
                    <tr key={row.grade} className="border-b border-primary-50">
                      <th scope="row" className="py-3.5 pr-4 font-heading font-semibold text-ink">
                        {row.grade}
                      </th>
                      <td className="py-3.5 text-muted">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-card bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Required Documents</h2>
              <ul className="mt-6 space-y-3">
                {documents.map((doc) => (
                  <li key={doc} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-0.5 text-secondary">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Fee information */}
      <section className="py-16 sm:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-card border border-dashed border-accent bg-accent-50 p-10 text-center">
              <span aria-hidden="true" className="text-4xl">💰</span>
              <h2 className="mt-4 text-2xl font-bold text-ink">Fee Information</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                Our fee structure is designed to keep quality education accessible to
                the families of Koppal. Detailed, grade-wise fee information for
                2026–27 is available at the school office and will be shared during
                your campus visit or enquiry call.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="FAQs" title="Questions Parents Ask Us" />
          <FadeIn className="mx-auto max-w-3xl">
            <Accordion items={[...admissionFaqs]} />
          </FadeIn>
        </Container>
      </section>

      {/* Apply + Visit forms */}
      <section id="apply" className="scroll-mt-24 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-card bg-white p-8 shadow-lift sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Admission Enquiry</h2>
              <p className="mt-2 text-muted">
                Fill in your details and our admissions team will call you within one
                working day.
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div id="visit" className="scroll-mt-24 rounded-card bg-white p-8 shadow-lift sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Book a Campus Visit</h2>
              <p className="mt-2 text-muted">
                See our classrooms, meet our teachers, and get all your questions
                answered in person.
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
