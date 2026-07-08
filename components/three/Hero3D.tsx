"use client";

import dynamic from "next/dynamic";

/* Code-split: three.js only downloads on capable desktop clients,
   after hydration — never on the critical path, never on phones. */
export const Hero3D = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);
