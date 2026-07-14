import type { ReactNode } from "react";

const S = 2.4;
const GOLD = "#DFA10E";

type P = Record<string, ReactNode>;

const icons: P = {
  "smart-classroom": (
    <>
      <rect x="14" y="14" width="36" height="24" rx="3" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 38v6M24 44h16" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M22 26h8M22 30h5" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <circle cx="40" cy="28" r="3" stroke={GOLD} strokeWidth={1.8} fill="none" />
    </>
  ),
  flask: (
    <>
      <path d="M24 16h16M27 16v12l-8 18a2 2 0 002 3h22a2 2 0 002-3l-8-18V16" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M22 40h20" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <circle cx="30" cy="36" r="1.5" fill={GOLD} />
      <circle cx="36" cy="42" r="1" fill={GOLD} />
    </>
  ),
  laptop: (
    <>
      <rect x="16" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M12 42h40a2 2 0 01-2 4H14a2 2 0 01-2-4z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M28 44h8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M22 24h10M22 28h6" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <path d="M32 48V18c-5-3-10-4-16-4v28c6 0 11 1 16 4M32 48V18c5-3 10-4 16-4v28c-6 0-11 1-16 4" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M22 24h6M22 28h4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M38 24h6M38 28h4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  sports: (
    <>
      <circle cx="32" cy="30" r="16" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M16 30c4-4 8-5 16-5s12 1 16 5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M16 30c4 4 8 5 16 5s12-1 16-5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 14v32" stroke="currentColor" strokeWidth={S} />
      <path d="M24 48h16" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  bus: (
    <>
      <rect x="12" y="18" width="40" height="22" rx="4" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M12 30h40" stroke="currentColor" strokeWidth={S} />
      <rect x="16" y="22" width="8" height="6" rx="1" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <rect x="28" y="22" width="8" height="6" rx="1" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <rect x="40" y="22" width="8" height="6" rx="1" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <circle cx="22" cy="42" r="3" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="42" cy="42" r="3" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M12 34h4M48 34h4" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  "music-notes": (
    <>
      <circle cx="22" cy="40" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="42" cy="36" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M27 40V18M47 36V14" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M27 18c6-2 14-4 20-4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M27 24c6-2 14-4 20-4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" fill="none" />
    </>
  ),
  palette: (
    <>
      <path d="M32 12c-14 0-22 10-20 22 1 7 8 14 16 16 3 1 6-1 6-4v-2c0-3 2-5 5-5h3c7 0 12-5 12-12 0-9-8-15-22-15z" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="22" cy="28" r="2.5" fill={GOLD} />
      <circle cx="28" cy="20" r="2.5" fill="currentColor" />
      <circle cx="38" cy="20" r="2.5" fill={GOLD} />
      <circle cx="42" cy="28" r="2.5" fill="currentColor" />
    </>
  ),
  books: (
    <>
      <rect x="14" y="12" width="10" height="36" rx="2" stroke="currentColor" strokeWidth={S} fill="none" transform="rotate(-6 19 30)" />
      <rect x="26" y="12" width="10" height="36" rx="2" stroke="currentColor" strokeWidth={S} fill="none" />
      <rect x="38" y="14" width="10" height="34" rx="2" stroke="currentColor" strokeWidth={S} fill="none" transform="rotate(4 43 31)" />
      <path d="M18 20h4M30 18h4M42 20h4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  mentor: (
    <>
      <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M14 46c0-8 5-14 10-14h0c5 0 10 6 10 14" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <rect x="36" y="14" width="16" height="32" rx="2" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M40 22h8M40 26h6M40 30h4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  campus: (
    <>
      <path d="M32 12L12 26h40L32 12z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <rect x="14" y="26" width="36" height="22" stroke="currentColor" strokeWidth={S} fill="none" />
      <rect x="26" y="34" width="12" height="14" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M18 32h6M18 36h6M40 32h6M40 36h6" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
      <circle cx="32" cy="20" r="2" fill={GOLD} />
    </>
  ),
  star: (
    <>
      <path d="M32 12l6 14h14l-11 9 4 15-13-8-13 8 4-15-11-9h14z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M32 22l3 7h7l-6 4 2 8-6-4-6 4 2-8-6-4h7z" fill={GOLD} stroke="none" />
    </>
  ),
  telescope: (
    <>
      <path d="M12 20l24 18" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <ellipse cx="14" cy="21" rx="6" ry="3" transform="rotate(-35 14 21)" stroke="currentColor" strokeWidth={S} fill="none" />
      <ellipse cx="24" cy="28" rx="4" ry="2" transform="rotate(-35 24 28)" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="38" cy="38" r="3" stroke={GOLD} strokeWidth={S} fill="none" />
      <path d="M38 42v8M32 50h12" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M34 42l-4 8M42 42l4 8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="46" cy="16" r="1.5" fill={GOLD} />
      <circle cx="52" cy="22" r="1" fill={GOLD} />
    </>
  ),
  target: (
    <>
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth={1.8} fill="none" />
      <circle cx="32" cy="32" r="6" stroke={GOLD} strokeWidth={S} fill="none" />
      <circle cx="32" cy="32" r="2" fill={GOLD} />
    </>
  ),
  coins: (
    <>
      <ellipse cx="28" cy="36" rx="12" ry="6" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M16 36v-6c0-3.3 5.4-6 12-6s12 2.7 12 6v6" stroke="currentColor" strokeWidth={S} fill="none" />
      <ellipse cx="28" cy="24" rx="12" ry="6" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M40 24v-6" stroke="currentColor" strokeWidth={S} />
      <ellipse cx="28" cy="18" rx="12" ry="6" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M25 24l2 3 5-5" stroke={GOLD} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  handshake: (
    <>
      <path d="M12 28h6l6-6c2-2 5-2 7 0l3 3" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M52 28h-6l-6-6c-2-2-5-2-7 0l-3 3" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M26 34l4 4c2 2 5 2 7 0l4-4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M22 38l3 3c2 2 4 2 6 0" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M34 38l3 3c2 2 4 2 6 0" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  namaste: (
    <>
      <path d="M28 18c0-3 2-5 4-5s4 2 4 5" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M24 34V22c0-2 1-3 3-3h10c2 0 3 1 3 3v12" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M24 34c-4 1-8 4-8 8h32c0-4-4-7-8-8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M30 26v6M34 26v6" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M28 48h8" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M32 10c-9 0-14 6-14 13 0 5 3 9 6 12 1 1 2 3 2 5h12c0-2 1-4 2-5 3-3 6-7 6-12 0-7-5-13-14-13z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M26 44h12M28 48h8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M32 20v8M28 24l4 4 4-4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth={S} fill="none" />
      <ellipse cx="32" cy="32" rx="8" ry="18" stroke="currentColor" strokeWidth={1.8} fill="none" />
      <path d="M14 32h36" stroke="currentColor" strokeWidth={1.8} />
      <path d="M16 22h32M16 42h32" stroke="currentColor" strokeWidth={1.2} />
      <path d="M32 14v36" stroke={GOLD} strokeWidth={1.5} />
    </>
  ),
  heart: (
    <>
      <path d="M32 48L16 32c-5-5-5-13 0-18s13-5 16 2c3-7 11-7 16-2s5 13 0 18L32 48z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M32 38l-6-6c-2-2-2-5 0-7s5-2 6 0c1-2 4-2 6 0s2 5 0 7l-6 6z" fill={GOLD} stroke="none" />
    </>
  ),
  person: (
    <>
      <circle cx="32" cy="18" r="7" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M18 48c0-10 6-18 14-18s14 8 14 18" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M26 38l6-4 6 4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  trophy: (
    <>
      <path d="M22 14h20v12c0 6-5 10-10 10s-10-4-10-10V14z" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M22 18h-6c0 6 3 10 6 10M42 18h6c0 6-3 10-6 10" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M32 36v4M24 44h16M26 40h12" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M29 22l3 3 5-5" stroke={GOLD} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  microscope: (
    <>
      <circle cx="36" cy="16" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M36 21v6l-10 12" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="26" cy="39" r="8" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M14 50h36" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M26 50v-3" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="36" cy="16" r="2" fill={GOLD} />
    </>
  ),
  medal: (
    <>
      <path d="M24 12l8 14 8-14" stroke={GOLD} strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M20 12h24" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <circle cx="32" cy="36" r="12" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 28l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill={GOLD} stroke="none" />
    </>
  ),
  math: (
    <>
      <rect x="14" y="14" width="36" height="36" rx="4" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M22 24h20" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M32 18v12" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M22 40h20" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <circle cx="26" cy="36" r="1.5" fill={GOLD} />
      <circle cx="26" cy="44" r="1.5" fill={GOLD} />
    </>
  ),
  badge: (
    <>
      <path d="M32 12l4 6h8l-2 8 4 6-7 3-3 7-4-5-4 5-3-7-7-3 4-6-2-8h8z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="28" r="6" stroke={GOLD} strokeWidth={S} fill="none" />
      <path d="M30 28l2 2 4-4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 42v8M32 44v8M38 42v8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  house: (
    <>
      <path d="M12 30L32 14l20 16" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="18" y="30" width="28" height="18" stroke="currentColor" strokeWidth={S} fill="none" />
      <rect x="28" y="36" width="8" height="12" stroke="currentColor" strokeWidth={S} fill="none" />
      <rect x="22" y="34" width="5" height="4" stroke={GOLD} strokeWidth={1.5} fill="none" />
      <rect x="37" y="34" width="5" height="4" stroke={GOLD} strokeWidth={1.5} fill="none" />
      <path d="M32 14v-4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  celebration: (
    <>
      <path d="M20 48L14 18l16 12-8 4z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M32 24l6-6M38 18l2-4M42 22l4-2M36 30l6 2M28 14l-2-4M22 12l-4 2" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <circle cx="44" cy="14" r="2" fill={GOLD} />
      <circle cx="48" cy="28" r="1.5" fill="currentColor" />
      <circle cx="24" cy="10" r="1.5" fill="currentColor" />
    </>
  ),
  teddy: (
    <>
      <circle cx="22" cy="18" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="42" cy="18" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <ellipse cx="32" cy="32" rx="14" ry="16" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="26" cy="28" r="2" fill="currentColor" />
      <circle cx="38" cy="28" r="2" fill="currentColor" />
      <ellipse cx="32" cy="34" rx="3" ry="2" fill={GOLD} />
      <path d="M29 38c1.5 2 4.5 2 6 0" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    </>
  ),
  pencil: (
    <>
      <path d="M40 12l10 10-26 26H14V38z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M36 16l10 10" stroke="currentColor" strokeWidth={S} />
      <path d="M14 48l8-2-6-6-2 8z" fill={GOLD} stroke={GOLD} strokeWidth={1} strokeLinejoin="round" />
      <path d="M22 36l10 10" stroke={GOLD} strokeWidth={1.5} />
    </>
  ),
  graduation: (
    <>
      <path d="M8 24l24-10 24 10-24 10z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M16 28v12c0 4 7 8 16 8s16-4 16-8V28" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M56 24v16" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <circle cx="56" cy="42" r="2" fill={GOLD} />
    </>
  ),
  dance: (
    <>
      <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 19v14" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M20 28l12 5 12-5" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 50l8-17 8 17" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18 26l4 4M46 26l-4 4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  wrestling: (
    <>
      <circle cx="22" cy="16" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <circle cx="42" cy="16" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M22 21v8l-8 14M22 29l8-4" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M42 21v8l8 14M42 29l-8-4" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M30 25h4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <path d="M18 46h8M38 46h8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  water: (
    <>
      <path d="M32 10c-8 10-16 18-16 26a16 16 0 0032 0c0-8-8-16-16-26z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M24 38c0-5 4-10 8-14" stroke={GOLD} strokeWidth={S} strokeLinecap="round" fill="none" />
      <circle cx="28" cy="42" r="1.5" fill={GOLD} />
    </>
  ),
  flag: (
    <>
      <path d="M18 10v42" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <rect x="18" y="12" width="30" height="24" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M18 20h30" stroke="currentColor" strokeWidth={1.5} />
      <path d="M18 28h30" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="33" cy="24" r="3" stroke={GOLD} strokeWidth={1.8} fill="none" />
      <circle cx="33" cy="24" r="1" fill={GOLD} />
    </>
  ),
  temple: (
    <>
      <path d="M12 46h40" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M14 46V30h36v16" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M14 30L32 18l18 12" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M22 46V34M32 46V34M42 46V34" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M28 18V14" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <path d="M36 18V14" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
  runner: (
    <>
      <circle cx="36" cy="12" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M28 22l8 6v10l8 10" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M36 28l10-4" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M22 24l6-2" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M36 38l-10 10" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M14 20l8 2" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <path d="M18 16l2 2" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  yoga: (
    <>
      <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 19v14" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M14 30l18 3 18-3" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 50l8-17 8 17" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="26" r="2" fill={GOLD} />
    </>
  ),
  pin: (
    <>
      <path d="M32 50s-14-12-14-22a14 14 0 0128 0c0 10-14 22-14 22z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="28" r="5" stroke={GOLD} strokeWidth={S} fill="none" />
      <circle cx="32" cy="28" r="1.5" fill={GOLD} />
    </>
  ),
  phone: (
    <>
      <path d="M18 14c0-2 2-4 6-4h2l3 8-4 3c2 6 6 10 12 12l3-4 8 3v2c0 4-2 6-4 6-14 0-26-12-26-26z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M36 14c6 0 10 4 10 10" stroke={GOLD} strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M36 20c3 0 4 1 4 4" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" fill="none" />
    </>
  ),
  envelope: (
    <>
      <rect x="10" y="16" width="44" height="32" rx="3" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M10 19l22 16 22-16" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M10 45l14-12M54 45l-14-12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="32" cy="30" r="2" fill={GOLD} />
    </>
  ),
  clock: (
    <>
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 18v14l8 8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="2" fill={GOLD} />
      <path d="M32 14v2M50 32h-2M32 50v-2M14 32h2" stroke={GOLD} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  megaphone: (
    <>
      <path d="M16 26h4l18-8v28l-18-8h-4a3 3 0 01-3-3v-6a3 3 0 013-3z" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" fill="none" />
      <path d="M38 22v20" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M44 24c4 2 6 5 6 8s-2 6-6 8" stroke={GOLD} strokeWidth={S} strokeLinecap="round" fill="none" />
      <path d="M20 38v6a3 3 0 003 3h4a3 3 0 003-3v-4" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  backpack: (
    <>
      <path d="M22 18c0-6 4-8 10-8s10 2 10 8" stroke="currentColor" strokeWidth={S} strokeLinecap="round" fill="none" />
      <rect x="16" y="18" width="32" height="30" rx="4" stroke="currentColor" strokeWidth={S} fill="none" />
      <rect x="24" y="32" width="16" height="12" rx="2" stroke="currentColor" strokeWidth={S} fill="none" />
      <path d="M32 32v4" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
      <path d="M16 26h-4v14h4M48 26h4v14h-4" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 24h16" stroke={GOLD} strokeWidth={S} strokeLinecap="round" />
    </>
  ),
};

export type IconName = keyof typeof icons;

export function SiteIcon({
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
