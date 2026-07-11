import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageHeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs: { label: React.ReactNode; href?: string }[];
}

export function PageHero({ title, description, crumbs }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-14 sm:py-20">
      <Container>
        <Breadcrumbs items={crumbs} />
        <FadeIn>
          <h1 className="mt-6 text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
          )}
        </FadeIn>
      </Container>
    </section>
  );
}
