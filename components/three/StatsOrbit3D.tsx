"use client";

import dynamic from "next/dynamic";

/* Code-split wrapper — see Hero3D.tsx for the rationale. */
export const StatsOrbit3D = dynamic(
  () => import("./StatsOrbitScene").then((m) => m.StatsOrbitScene),
  { ssr: false }
);
