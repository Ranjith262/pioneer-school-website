import type { Metadata } from "next";
import { achievements } from "@/content/achievements";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

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
        title="Achievements"
        description="Every trophy tells a story of effort. Here are some of our proudest recent moments."
        crumbs={[{ label: "Achievements" }]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <StaggerItem key={achievement.title}>
                <article className="h-full rounded-card bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="flex items-start justify-between gap-3">
                    <span aria-hidden="true" className="text-4xl">
                      {achievement.emoji}
                    </span>
                    <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    {achievement.category}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-ink">
                    {achievement.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {achievement.description}
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
