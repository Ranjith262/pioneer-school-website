import type { Metadata } from "next";
import { campusLife } from "@/content/campus-life";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { campusLifeImages, img } from "@/lib/images";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";
import { T } from "@/components/i18n/T";

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
        title={<T k="pages.campusLife.title" />}
        description={<T k="pages.campusLife.description" />}
        crumbs={[{ label: <T k="pages.campusLife.crumb" /> }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campusLife.map((section, i) => {
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
                      <T k={`pages.campusLife.items.${i}.title`} />
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      <T k={`pages.campusLife.items.${i}.description`} />
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {section.highlights.map((_, hi) => (
                        <li
                          key={hi}
                          className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
                        >
                          <T k={`pages.campusLife.items.${i}.highlights.${hi}`} />
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
              <T k="common.viewPhotos" /> →
            </ButtonLink>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
