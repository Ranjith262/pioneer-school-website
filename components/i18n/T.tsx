"use client";

import { useLanguage } from "./LanguageProvider";

/**
 * Translation leaf: renders t(k) as a text node. Lets SERVER components
 * (pages, footer) keep their structure and server rendering while each
 * piece of text becomes a tiny client island that re-renders on
 * language change.
 *
 *   <h2><T k="home.welcome.titleA" /></h2>
 */
export function T({ k }: { k: string }) {
  const { t } = useLanguage();
  return <>{t(k)}</>;
}
