import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/lib/images";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { T } from "@/components/i18n/T";
import { SiteIcon } from "@/components/ui/SiteIcon";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Pioneer Public School's history, vision, mission, values, faculty, and infrastructure — serving Bhagyanagar, Koppal since 2015.",
  alternates: { canonical: "/about" },
};

const valueIcons = ["handshake", "star", "namaste", "lightbulb", "globe", "heart"];
const facultyIcons = ["person", "person", "person", "person"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={<T k="pages.about.title" />}
        description={<T k="pages.about.description" />}
        crumbs={[{ label: <T k="pages.about.crumb" /> }]}
      />

      {/* History */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              <T k="pages.about.history.eyebrow" />
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              <T k="pages.about.history.title" />
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p><T k="pages.about.history.p1" /></p>
              <p><T k="pages.about.history.p2" /></p>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <Photo
              src={img.indianSchoolRoom.src}
              alt={img.indianSchoolRoom.alt}
              className="aspect-[4/3] rounded-card shadow-lift"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* Vision & Mission */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-card bg-white p-10 shadow-soft">
              <SiteIcon name="telescope" className="h-10 w-10 text-primary" />
              <h2 className="mt-4 text-2xl font-bold text-ink">
                <T k="pages.about.vision.title" />
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                <T k="pages.about.vision.text" />
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-card bg-white p-10 shadow-soft">
              <SiteIcon name="target" className="h-10 w-10 text-primary" />
              <h2 className="mt-4 text-2xl font-bold text-ink">
                <T k="pages.about.mission.title" />
              </h2>
              <ul className="mt-4 space-y-3 text-lg leading-relaxed text-muted">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>• <T k={`pages.about.mission.items.${i}`} /></li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* Principal's message */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right" className="order-2 lg:order-1">
            <Photo
              src={img.teacherBlackboard.src}
              alt={img.teacherBlackboard.alt}
              className="aspect-[4/3] rounded-card shadow-lift"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeIn>
          <FadeIn direction="left" className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              <T k="pages.about.principal.eyebrow" />
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink">
              <T k="pages.about.principal.title" />
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p><T k="pages.about.principal.p1" /></p>
              <p><T k="pages.about.principal.p2" /></p>
            </div>
            <p className="mt-5 font-heading font-semibold text-ink">
              <T k="pages.about.principal.attribution" />
            </p>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* Milestones */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={<T k="pages.about.milestones.eyebrow" />}
            title={<T k="pages.about.milestones.title" />}
          />
          <ol className="relative mx-auto max-w-3xl space-y-8 border-l-2 border-primary-100 pl-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <li className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-primary shadow-soft"
                  />
                  <p className="font-heading text-lg font-bold text-primary">
                    <T k={`pages.about.milestones.items.${i}.year`} />
                  </p>
                  <p className="mt-1 text-muted">
                    <T k={`pages.about.milestones.items.${i}.event`} />
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* Faculty & management */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={<T k="pages.about.faculty.eyebrow" />}
            title={<T k="pages.about.faculty.title" />}
            description={<T k="pages.about.faculty.description" />}
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-card bg-white p-7 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                    <SiteIcon name={facultyIcons[i]} className="h-8 w-8 text-primary" />
                  </span>
                  <h3 className="mt-4 font-heading font-semibold text-ink">
                    <T k={`pages.about.faculty.items.${i}.name`} />
                  </h3>
                  <p className="text-sm font-medium text-secondary">
                    <T k={`pages.about.faculty.items.${i}.role`} />
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    <T k={`pages.about.faculty.items.${i}.note`} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-surface" />

      {/* Values */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={<T k="pages.about.values.eyebrow" />}
            title={<T k="pages.about.values.title" />}
            description={<T k="pages.about.values.description" />}
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <StaggerItem key={i}>
                <div className="flex h-full gap-4 rounded-card bg-white p-6 shadow-soft">
                  <SiteIcon name={valueIcons[i]} className="h-8 w-8 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-heading font-semibold text-ink">
                      <T k={`pages.about.values.items.${i}.name`} />
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      <T k={`pages.about.values.items.${i}.description`} />
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <SectionDivider variant="wave" flip className="text-surface" />

      {/* Recognition & disclosure */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-card border border-primary-100 bg-white p-10 shadow-soft">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.about.recognition.title" />
              </h2>
              <p className="mt-4 text-muted">
                <T k="pages.about.recognition.text" />
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-card border border-primary-100 bg-white p-10 shadow-soft">
              <h2 className="text-2xl font-bold text-ink">
                <T k="pages.about.disclosure.title" />
              </h2>
              <p className="mt-4 text-muted">
                <T k="pages.about.disclosure.text" />
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider variant="wave" className="text-primary-800" />

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-800 to-primary py-16 text-white">
        <Container className="text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold"><T k="common.comeSee" /></h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              <T k="common.comeSeeDesc" />
            </p>
            <div className="mt-8">
              <ButtonLink href="/admissions#visit" variant="accent" size="lg">
                <T k="common.bookTour" />
              </ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
