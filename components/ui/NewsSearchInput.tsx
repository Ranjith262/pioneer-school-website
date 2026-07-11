"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export function NewsSearchInput({ defaultValue }: { defaultValue: string }) {
  const { t } = useLanguage();
  return (
    <input
      id="news-search"
      type="search"
      name="q"
      defaultValue={defaultValue}
      placeholder={t("pages.news.searchPlaceholder")}
      className="w-full rounded-full border border-primary-100 bg-white px-5 py-2.5 text-sm shadow-soft focus:border-primary focus:outline-none md:w-64"
    />
  );
}
