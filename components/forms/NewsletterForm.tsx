"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <p role="status" className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
        ✓ {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="relative mt-4" noValidate>
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email"
          autoComplete="email"
          className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-600 disabled:opacity-60"
        >
          {pending ? "…" : "Join"}
        </button>
      </div>
      {state.status === "error" && (
        <p role="status" className="mt-2 text-sm text-red-300">
          {state.message}
        </p>
      )}
    </form>
  );
}
