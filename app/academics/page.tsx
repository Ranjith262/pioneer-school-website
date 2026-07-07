import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/content/programs";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { img, programImages } from "@/lib/images";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore academic programs at Pioneer Public School — Nursery, LKG, UKG, Primary, Middle School, and Secondary (SSLC).",
  alternates: { canonical: "/academics" },
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics"
        description="A carefully sequenced learning journey from the first day of Nursery to the SSLC board examinations."
        crumbs={[{ label: "Academics" }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const photo = programImages[program.slug] ?? img.kidsWriting;
              return (
              <StaggerItem key={program.slug}>
                <Link
                  href={`/academics/${program.slug}`}
                  className="group block h-full overflow-hidden rounded-card bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
                >
                  <Photo
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[8/5]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                      {program.ageRange}
                    </p>
                    <h2 className="mt-2 font-heading text-xl font-semibold text-ink group-hover:text-primary">
                      {program.name}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {program.summary}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-primary">
                      Explore Program →
                    </p>
                  </div>
                </Link>
              </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
