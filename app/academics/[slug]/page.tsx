import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProgram, programs } from "@/content/programs";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { img, programImages } from "@/lib/images";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: `${program.name} — Academics`,
    description: program.summary,
    alternates: { canonical: `/academics/${program.slug}` },
  };
}

function DetailCard({
  title,
  emoji,
  items,
}: {
  title: string;
  emoji: string;
  items: string[];
}) {
  return (
    <div className="h-full rounded-card bg-white p-8 shadow-soft">
      <h2 className="flex items-center gap-3 font-heading text-xl font-semibold text-ink">
        <span aria-hidden="true" className="text-2xl">
          {emoji}
        </span>
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-muted">
            <span aria-hidden="true" className="mt-1 text-secondary">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <>
      <PageHero
        title={program.name}
        description={`${program.ageRange} · ${program.summary}`}
        crumbs={[{ label: "Academics", href: "/academics" }, { label: program.name }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <FadeIn>
            <Photo
              src={(programImages[program.slug] ?? img.kidsWriting).src}
              alt={(programImages[program.slug] ?? img.kidsWriting).alt}
              className="aspect-[21/9] rounded-card shadow-lift"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <DetailCard title="Curriculum" emoji="📘" items={program.curriculum} />
            </FadeIn>
            <FadeIn delay={0.08}>
              <DetailCard
                title="Teaching Methodology"
                emoji="🧑‍🏫"
                items={program.methodology}
              />
            </FadeIn>
            <FadeIn delay={0.16}>
              <DetailCard
                title="Learning Outcomes"
                emoji="🌟"
                items={program.outcomes}
              />
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="h-full rounded-card bg-white p-8 shadow-soft">
                <h2 className="flex items-center gap-3 font-heading text-xl font-semibold text-ink">
                  <span aria-hidden="true" className="text-2xl">
                    📝
                  </span>
                  Assessment
                </h2>
                <p className="mt-4 text-muted">{program.assessment}</p>
                <h3 className="mt-6 font-heading font-semibold text-ink">
                  Signature Activities
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {program.activities.map((activity) => (
                    <span
                      key={activity}
                      className="rounded-full bg-secondary-50 px-3.5 py-1.5 text-sm font-medium text-secondary-700"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Downloads */}
          <FadeIn className="mt-12">
            <div className="rounded-card border border-dashed border-primary/40 bg-primary-50 p-8 text-center">
              <h2 className="font-heading text-lg font-semibold text-ink">
                📥 Downloads — Syllabus & Booklists
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
                Detailed syllabus documents and booklists for {program.name} will be
                published here at the start of each academic year. Meanwhile, copies are
                available at the school office.
              </p>
            </div>
          </FadeIn>

          <FadeIn className="mt-12 text-center">
            <ButtonLink href="/admissions#apply" size="lg">
              Apply for {program.name}
            </ButtonLink>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
