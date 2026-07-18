import type { ReactNode } from "react";

/**
 * Premium duotone icon set for the home feature sections (Pioneer
 * Promise + Our Campus). Phosphor-Duotone style: a soft filled
 * under-layer (low-opacity currentColor / gold) beneath crisp
 * 2.5px strokes, with small solid-gold accent elements.
 *
 * SiteIcon stays the utility set for the rest of the site; these are
 * deliberately richer and read best at 48-64px.
 */

const S = 2.5;
const GOLD = "#DFA10E";
const GOLD_FILL = "#F5B301";

type P = Record<string, ReactNode>;

const icons: P = {
  /* ── Pioneer Promise ─────────────────────────────────────── */

  books: (
    <>
      {/* stacked books, gold middle spine + sparkle */}
      <rect x="13" y="41" width="38" height="10" rx="2.5" fill="currentColor" opacity=".12" />
      <rect x="13" y="41" width="38" height="10" rx="2.5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M20 41v10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" opacity=".45" />
      <rect x="17" y="30" width="32" height="10" rx="2.5" fill={GOLD_FILL} opacity=".22" />
      <rect x="17" y="30" width="32" height="10" rx="2.5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M42 30v10" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
      <rect x="20" y="19" width="25" height="10" rx="2.5" fill="currentColor" opacity=".12" />
      <rect x="20" y="19" width="25" height="10" rx="2.5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M52 10l1.6 3.9 3.9 1.6-3.9 1.6L52 21l-1.6-3.9-3.9-1.6 3.9-1.6z" fill={GOLD_FILL} />
    </>
  ),

  mentor: (
    <>
      {/* mentor with graduation cap guiding a student */}
      <circle cx="24" cy="21" r="6.5" fill="currentColor" opacity=".12" />
      <circle cx="24" cy="21" r="6.5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M11 50c0-8.5 5.5-14 13-14s13 5.5 13 14" fill="currentColor" opacity=".12" />
      <path d="M11 50c0-8.5 5.5-14 13-14s13 5.5 13 14" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M14 12.5l10-4.5 10 4.5-10 4.5z" fill={GOLD_FILL} opacity=".85" />
      <path d="M14 12.5l10-4.5 10 4.5-10 4.5z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" fill="none" />
      <path d="M34 13.5v6" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
      <circle cx="46" cy="29" r="5" fill={GOLD_FILL} opacity=".25" />
      <circle cx="46" cy="29" r="5" stroke="currentColor" strokeWidth={2.2} fill="none" />
      <path d="M37.5 50c0-6.5 3.8-10.5 8.5-10.5S54.5 43.5 54.5 50" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" fill="none" />
    </>
  ),

  campus: (
    <>
      {/* shield of safety wrapped around a home */}
      <path d="M32 7l19 6.5V28c0 12.5-8.5 20.5-19 27-10.5-6.5-19-14.5-19-27V13.5z" fill="currentColor" opacity=".1" />
      <path d="M32 7l19 6.5V28c0 12.5-8.5 20.5-19 27-10.5-6.5-19-14.5-19-27V13.5z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M23 31.5l9-8 9 8V42H23z" fill={GOLD_FILL} opacity=".22" />
      <path d="M23 31.5l9-8 9 8V42H23z" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" fill="none" />
      <path d="M29.5 42v-6.5h5V42" stroke={GOLD} strokeWidth={2} strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="17" r="1.8" fill={GOLD_FILL} />
    </>
  ),

  star: (
    <>
      {/* rising star in orbit — the whole child */}
      <ellipse cx="32" cy="36" rx="24" ry="9.5" stroke={GOLD} strokeWidth={1.6} fill="none" opacity=".7" strokeDasharray="4 5" strokeLinecap="round" />
      <path d="M32 11l5.4 11 12.1 1.8-8.7 8.5 2 12.1L32 38.7l-10.8 5.7 2-12.1-8.7-8.5L26.6 22z" fill={GOLD_FILL} opacity=".28" />
      <path d="M32 11l5.4 11 12.1 1.8-8.7 8.5 2 12.1L32 38.7l-10.8 5.7 2-12.1-8.7-8.5L26.6 22z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <circle cx="8" cy="36" r="2.2" fill={GOLD_FILL} />
      <path d="M53 50l1.2 2.8 2.8 1.2-2.8 1.2L53 58l-1.2-2.8-2.8-1.2 2.8-1.2z" fill={GOLD_FILL} />
    </>
  ),

  /* ── Our Campus facilities ───────────────────────────────── */

  "smart-classroom": (
    <>
      {/* interactive digital board mid-lesson */}
      <rect x="11" y="11" width="42" height="28" rx="3.5" fill="currentColor" opacity=".1" />
      <rect x="11" y="11" width="42" height="28" rx="3.5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M27.5 20l10.5 5-10.5 5z" fill={GOLD_FILL} opacity=".85" />
      <path d="M27.5 20l10.5 5-10.5 5z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" fill="none" />
      <path d="M18 34h12" stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
      <path d="M34 34h6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity=".45" />
      <path d="M32 39v7M22 52h20" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M32 46l-6 6M32 46l6 6" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M47 5.5c2.8 0 5 2.2 5 5" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <circle cx="47" cy="10.5" r="1.4" fill={GOLD_FILL} />
    </>
  ),

  flask: (
    <>
      {/* conical flask with golden reaction */}
      <path d="M25 34h14l6.8 12.9A3 3 0 0143.1 51H20.9a3 3 0 01-2.7-4.1z" fill={GOLD_FILL} opacity=".3" />
      <path d="M26 10h12M28.5 10v12.5L18.2 42.4A3.2 3.2 0 0021.1 47h21.8a3.2 3.2 0 002.9-4.6L35.5 22.5V10" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24.8 33.5h14.4" stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
      <circle cx="29" cy="39.5" r="1.7" fill={GOLD_FILL} />
      <circle cx="35.5" cy="43" r="1.2" fill={GOLD_FILL} />
      <circle cx="41" cy="16" r="1.6" fill={GOLD_FILL} />
      <path d="M46 22l1.1 2.6 2.6 1.1-2.6 1.1L46 29.4l-1.1-2.6-2.6-1.1 2.6-1.1z" fill={GOLD_FILL} />
    </>
  ),

  laptop: (
    <>
      {/* laptop running code */}
      <rect x="15" y="12" width="34" height="23" rx="2.8" fill="currentColor" opacity=".1" />
      <rect x="15" y="12" width="34" height="23" rx="2.8" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M26.5 19.5L22 23.5l4.5 4M37.5 19.5l4.5 4-4.5 4" stroke={GOLD} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M33.5 18.5l-3 10" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity=".5" />
      <path d="M11 41h42a2.5 2.5 0 01-2.5 5h-37A2.5 2.5 0 0111 41z" fill="currentColor" opacity=".14" />
      <path d="M11 41h42a2.5 2.5 0 01-2.5 5h-37A2.5 2.5 0 0111 41z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M28 43.5h8" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),

  book: (
    <>
      {/* open storybook with gold bookmark */}
      <path d="M32 17c-5.5-4-13-4.8-19-3.6v32c6-1.2 13.5-.4 19 3.6z" fill="currentColor" opacity=".1" />
      <path d="M32 17c5.5-4 13-4.8 19-3.6v32c-6-1.2-13.5-.4-19 3.6z" fill={GOLD_FILL} opacity=".18" />
      <path d="M32 17c-5.5-4-13-4.8-19-3.6v32c6-1.2 13.5-.4 19 3.6 5.5-4 13-4.8 19-3.6v-32c-6-1.2-13.5-.4-19 3.6z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M32 17v32" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity=".5" />
      <path d="M18.5 21.5c3.5-.4 7 .1 10 1.4M18.5 28c3.5-.4 7 .1 10 1.4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" opacity=".45" fill="none" />
      <path d="M42 14.2v10.3l3.2-2.7 3.2 2.7V14" stroke={GOLD} strokeWidth={2} strokeLinejoin="round" fill="none" />
    </>
  ),

  sports: (
    <>
      {/* cricket bat + spinning ball */}
      <path d="M19.5 46.5l14-23.5 8.6 5.2-14 23.5z" fill="currentColor" opacity=".12" />
      <path d="M19.5 46.5l14-23.5 8.6 5.2-14 23.5a3 3 0 01-4.1 1l-3.4-2a3 3 0 01-1.1-4.2z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M37.8 25.8l4.2-7" stroke="currentColor" strokeWidth={3.6} strokeLinecap="round" />
      <circle cx="47" cy="43" r="7.5" fill={GOLD_FILL} opacity=".3" />
      <circle cx="47" cy="43" r="7.5" stroke="currentColor" strokeWidth={2.4} fill="none" />
      <path d="M42.5 39c2.5 2.5 6.5 5.5 9 7.5" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d="M34 47h-4M32 52h-5" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" opacity=".9" />
      <circle cx="14" cy="18" r="2" fill={GOLD_FILL} />
    </>
  ),

  bus: (
    <>
      {/* school bus with golden windows */}
      <rect x="9" y="15" width="46" height="28" rx="5" fill="currentColor" opacity=".1" />
      <rect x="9" y="15" width="46" height="28" rx="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <rect x="14.5" y="21" width="10" height="9" rx="1.8" fill={GOLD_FILL} opacity=".3" />
      <rect x="14.5" y="21" width="10" height="9" rx="1.8" stroke="currentColor" strokeWidth={1.8} fill="none" />
      <rect x="29" y="21" width="10" height="9" rx="1.8" fill={GOLD_FILL} opacity=".3" />
      <rect x="29" y="21" width="10" height="9" rx="1.8" stroke="currentColor" strokeWidth={1.8} fill="none" />
      <path d="M9 35.5h46" stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
      <circle cx="20" cy="45" r="5" fill="#fff" />
      <circle cx="20" cy="45" r="5" stroke="currentColor" strokeWidth={2.4} fill="none" />
      <circle cx="20" cy="45" r="1.6" fill={GOLD_FILL} />
      <circle cx="44" cy="45" r="5" fill="#fff" />
      <circle cx="44" cy="45" r="5" stroke="currentColor" strokeWidth={2.4} fill="none" />
      <circle cx="44" cy="45" r="1.6" fill={GOLD_FILL} />
      <rect x="47" y="22.5" width="4.5" height="6" rx="1" fill={GOLD_FILL} opacity=".85" />
    </>
  ),

  "music-notes": (
    <>
      {/* beamed notes with sparkle */}
      <path d="M25 15.5v-6.2l21-5v6.2z" fill="currentColor" opacity=".85" transform="translate(0 8)" />
      <path d="M25 44V17.3l21-5V39" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="19.8" cy="44.5" rx="5.6" ry="4.4" fill={GOLD_FILL} opacity=".3" />
      <ellipse cx="19.8" cy="44.5" rx="5.6" ry="4.4" stroke="currentColor" strokeWidth={2.2} fill="none" />
      <ellipse cx="40.8" cy="39.5" rx="5.6" ry="4.4" fill={GOLD_FILL} opacity=".3" />
      <ellipse cx="40.8" cy="39.5" rx="5.6" ry="4.4" stroke="currentColor" strokeWidth={2.2} fill="none" />
      <path d="M53 15l1.3 3.1 3.1 1.3-3.1 1.3L53 23.8l-1.3-3.1-3.1-1.3 3.1-1.3z" fill={GOLD_FILL} />
      <circle cx="10" cy="24" r="1.8" fill={GOLD_FILL} />
    </>
  ),

  palette: (
    <>
      {/* artist palette with paint dabs */}
      <path d="M32 9C18.7 9 8 18.8 8 31c0 12.1 10.4 21.9 23 21.9 4.2 0 5.6-2 5.6-4.2 0-3.2-3.1-4.3-3.1-7.2 0-2.3 2-4.3 5.3-4.3h5.4C51.9 37.2 56 31.3 56 24.5 56 15.4 45.3 9 32 9z" fill="currentColor" opacity=".1" />
      <path d="M32 9C18.7 9 8 18.8 8 31c0 12.1 10.4 21.9 23 21.9 4.2 0 5.6-2 5.6-4.2 0-3.2-3.1-4.3-3.1-7.2 0-2.3 2-4.3 5.3-4.3h5.4C51.9 37.2 56 31.3 56 24.5 56 15.4 45.3 9 32 9z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <circle cx="22" cy="20.5" r="3" fill={GOLD_FILL} />
      <circle cx="35" cy="16.5" r="3" fill="currentColor" opacity=".55" />
      <circle cx="45.5" cy="21.5" r="3" fill={GOLD_FILL} opacity=".55" />
      <circle cx="16.5" cy="31" r="3" stroke={GOLD} strokeWidth={1.8} fill="none" />
    </>
  ),
};

export type DuoIconName = keyof typeof icons;

export function DuoIcon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      role="presentation"
    >
      {icon}
    </svg>
  );
}
