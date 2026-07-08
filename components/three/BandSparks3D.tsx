"use client";

import dynamic from "next/dynamic";

/* Code-split wrapper — see Hero3D.tsx for the rationale. */
export const BandSparks3D = dynamic(
  () => import("./BandSparks").then((m) => m.BandSparks),
  { ssr: false }
);
