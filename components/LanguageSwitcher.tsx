"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LANGUAGE_META, LANGUAGES } from "@/lib/i18n/getTranslation";
import { cn } from "@/lib/utils";

/** EN | हिं | ಕನ್ನ pill. The active language is highlighted. */
export function LanguageSwitcher({
  className,
  tone = "light",
}: {
  className?: string;
  /** "dark" renders on dark backgrounds (announcement bar) */
  tone?: "light" | "dark";
}) {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Choose language"
      className={cn(
        "flex shrink-0 items-center rounded-full border p-1",
        tone === "light"
          ? "border-primary-100 bg-surface"
          : "border-white/25 bg-white/10",
        className
      )}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={LANGUAGE_META[lang].label}
          lang={LANGUAGE_META[lang].htmlLang}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            language === lang
              ? tone === "light"
                ? "bg-primary text-white shadow-soft"
                : "bg-accent text-ink shadow-soft"
              : tone === "light"
                ? "text-muted hover:text-primary"
                : "text-white/75 hover:text-white"
          )}
        >
          {LANGUAGE_META[lang].native}
        </button>
      ))}
    </div>
  );
}
