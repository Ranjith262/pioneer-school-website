import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SiteIcon } from "@/components/ui/SiteIcon";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <SiteIcon name="backpack" className="mx-auto h-20 w-20 text-primary" />
        <h1 className="mt-6 text-4xl font-bold text-ink">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Looks like this page skipped class. Let&apos;s get you back to familiar ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
