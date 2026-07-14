import type { Metadata } from "next";
import { achievements } from "@/content/achievements";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { T } from "@/components/i18n/T";
import { SiteIcon } from "@/components/ui/SiteIcon";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Achievements of Pioneer Public School students — board results, science fairs, sports championships, olympiads, and awards.",
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        title={<T k="pages.achievements.title" />}
        description={<T k="pages.achievements.description" />}
        crumbs={[{ label: <T k="pages.achievements.crumb" /> }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, i) => (
              <StaggerItem key={achievement.title}>
                <article className="h-full rounded-card bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="flex items-start justify-between gap-3">
                    <SiteIcon name={achievement.icon} className="h-10 w-10 text-primary" />
                    <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    <T k={`content.categories.${achievement.category}`} />
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-ink">
                    <T k={`content.achievements.${i}.title`} />
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    <T k={`content.achievements.${i}.description`} />
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
