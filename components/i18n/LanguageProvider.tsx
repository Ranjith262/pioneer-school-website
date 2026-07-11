"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getTranslation,
  LANGUAGE_META,
  LANGUAGES,
  type Language,
} from "@/lib/i18n/getTranslation";

const STORAGE_KEY = "pps-language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Client-side language state for the whole site. Server components keep
 * rendering English HTML (SEO unchanged); the visible text swaps on the
 * client through t() / <T>. The choice persists in localStorage.
 *
 * First render always uses "en" (matching the server HTML, so hydration
 * never mismatches); the saved preference applies in an effect.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved && (LANGUAGES as readonly string[]).includes(saved)) {
      setLanguageState(saved as Language);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANGUAGE_META[language].htmlLang;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    sessionStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback((key: string) => getTranslation(key, language), [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
