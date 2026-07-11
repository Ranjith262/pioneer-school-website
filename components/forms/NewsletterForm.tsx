"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialFormState
  );
  const { t } = useLanguage();

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="mt-4 flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/15 px-5 py-3 text-sm font-medium text-white"
      >
        <span
          aria-hidden="true"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink"
        >
          ✓
        </span>
        {state.message}
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
          placeholder={t("chrome.footer.emailPlaceholder")}
          autoComplete="email"
          /* text-base on phones: iOS force-zooms the page for inputs
             under 16px and the zoom sticks after submit */
          className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-600 disabled:opacity-60"
        >
          {pending ? "…" : t("chrome.footer.join")}
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
