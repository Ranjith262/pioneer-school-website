import en from "./en.json";
import hi from "./hi.json";
import kn from "./kn.json";

export const LANGUAGES = ["en", "hi", "kn"] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_META: Record<
  Language,
  { label: string; native: string; htmlLang: string }
> = {
  en: { label: "English", native: "EN", htmlLang: "en" },
  hi: { label: "Hindi", native: "हिं", htmlLang: "hi" },
  kn: { label: "Kannada", native: "ಕ", htmlLang: "kn" },
};

const dictionaries: Record<Language, unknown> = { en, hi, kn };

function lookup(dict: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object") {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
}

/**
 * Resolve a dotted key ("home.promise.items.0.title") in the requested
 * language. Falls back to English, then to the key itself, so a missing
 * translation can never blank out the UI.
 */
export function getTranslation(key: string, language: Language): string {
  const value = lookup(dictionaries[language], key);
  if (typeof value === "string") return value;

  const fallback = lookup(dictionaries.en, key);
  if (typeof fallback === "string") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] Missing "${key}" in "${language}" — using English`);
    }
    return fallback;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(`[i18n] Unknown translation key "${key}"`);
  }
  return key;
}
