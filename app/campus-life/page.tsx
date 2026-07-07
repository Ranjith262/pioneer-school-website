import type { Metadata } from "next";
import { campusLife } from "@/content/campus-life";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { campusLifeImages, img } from "@/lib/images";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Campus Life",
  description:
    "Life at Pioneer Public School — sports, arts, music, dance, STEM, clubs, house system, educational tours, and celebrations.",
  alternates: { canonical: "/campus-life" },
};

export default function CampusLifePage() {
  return (
    <>
      <PageHero
        title="Campus Life"
        description="School is more than classrooms. At Pioneer, every day holds a stage, a field, a lab, and a library waiting to be explored."
        crumbs={[{ label: "Campus Life" }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campusLife.map((section) => {
              const photo = campusLifeImages[section.title] ?? img.kidsOutdoors;
              return (
              <StaggerItem key={section.title}>
                <article className="group h-full overflow-hidden rounded-card bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                  <Photo
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[8/5]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-7">
                    <h2 className="font-heading text-xl font-semibold text-ink">
                      {section.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {section.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {section.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn className="mt-14 text-center">
            <ButtonLink href="/gallery" variant="ghost">
              See Campus Life in Photos →
            </ButtonLink>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
