"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[page-error]", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <svg viewBox="0 0 64 64" className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="32" cy="32" r="24" />
            <path d="M32 20v16" />
            <circle cx="32" cy="44" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-ink">Something went wrong</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          We hit an unexpected problem loading this page. You can try again, or
          head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-primary px-6 py-2.5 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            Try again
          </button>
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
