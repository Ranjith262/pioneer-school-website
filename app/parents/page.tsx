import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Parents",
  description:
    "Parent resources at Pioneer Public School — holiday calendar, exam schedules, timetables, circulars, transport, and homework guidelines.",
  alternates: { canonical: "/parents" },
};

const resources = [
  {
    title: "Holiday Calendar",
    description: "Academic year calendar with holidays, exams, and events.",
    emoji: "📅",
    status: "Published at the start of each academic year.",
  },
  {
    title: "Exam Schedule",
    description: "Unit tests, term exams, and preparatory examination dates.",
    emoji: "📝",
    status: "Shared per term via circulars and the school diary.",
  },
  {
    title: "Class Timetable",
    description: "Grade-wise weekly timetables including activity periods.",
    emoji: "⏰",
    status: "Distributed on reopening day; copies at the office.",
  },
  {
    title: "Circulars",
    description: "All official communication from school to home.",
    emoji: "📄",
    status: "Latest circulars appear in the News section.",
  },
  {
    title: "Transport Routes",
    description: "Bus routes, stops, timings, and transport staff contacts.",
    emoji: "🚌",
    status: "Route details available at the school office.",
  },
  {
    title: "Homework Guidelines",
    description: "How we assign age-appropriate homework, and how parents can help.",
    emoji: "📚",
    status: "Shared during the first parent-teacher meeting.",
  },
];

export default function ParentsPage() {
  return (
    <>
      <PageHero
        title="Parents"
        description="You are our most important partner. Everything you need to support your child's journey is here."
        crumbs={[{ label: "Parents" }]}
      />

      {/* Resources */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Downloads & Resources"
            title="Everything in One Place"
            description="Documents are being digitised and will appear here as downloads. Meanwhile, all items are available at the school office."
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <StaggerItem key={resource.title}>
                <div className="h-full rounded-card bg-white p-8 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
                  <span aria-hidden="true" className="text-4xl">{resource.emoji}</span>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {resource.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{resource.description}</p>
                  <p className="mt-4 rounded-xl bg-surface px-4 py-2.5 text-xs font-medium text-muted">
                    {resource.status}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Parent portal (future) */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-card border border-dashed border-primary/40 bg-white p-10 text-center shadow-soft">
              <span aria-hidden="true" className="text-4xl">🔐</span>
              <h2 className="mt-4 text-2xl font-bold text-ink">Parent Portal — Coming Soon</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                We are building a secure parent portal for attendance, homework,
                fee payments, and report cards. Until then, our teachers and office
                team are just a phone call away at{" "}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {site.phone}
                </a>
                .
              </p>
              <p className="mt-6">
                <Link href="/contact" className="font-semibold text-primary hover:underline">
                  Contact the school office →
                </Link>
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
