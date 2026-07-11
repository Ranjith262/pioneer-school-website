"use client";

import { useLanguage } from "./LanguageProvider";
import type { Language } from "@/lib/i18n/getTranslation";

const LOCALES: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

/**
 * Date rendered in the visitor's chosen language — month names localise
 * automatically via Intl ("15 June 2026" / "15 जून 2026" / "15 ಜೂನ್ 2026").
 */
export function LocalDate({
  iso,
  format = "long",
}: {
  iso: string;
  format?: "long" | "monthShort";
}) {
  const { language } = useLanguage();
  const date = new Date(iso + "T00:00:00");
  return (
    <>
      {format === "long"
        ? date.toLocaleDateString(LOCALES[language], {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : date.toLocaleDateString(LOCALES[language], { month: "short" })}
    </>
  );
}
