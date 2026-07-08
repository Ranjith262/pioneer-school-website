"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import { LazyScene } from "./LazyScene";
import { LightDust } from "./LightDust";

/* Rising golden embers inside the full-bleed photographic bands —
   the same light motif as the hero, tuned quieter so the message
   stays the hero of the section. Phones run a narrower, lighter field. */

const BAND_CAMERA = { position: [0, 0, 8] as [number, number, number], fov: 45 };
const BAND_DPR: [number, number] = [1, 1.5];

export function BandSparks() {
  const isMobile = useIsMobile();

  return (
    <LazyScene camera={BAND_CAMERA} dpr={BAND_DPR}>
      <LightDust
        count={isMobile ? 55 : 130}
        area={isMobile ? [9, 10, 5] : [26, 9, 5]}
        center={[0, 0, 0]}
        colorA="#ffedc4"
        colorB="#f5b301"
        rise={0.5}
        opacity={0.75}
        repel={isMobile ? 0 : 0.6}
        bokehRatio={0.1}
      />
    </LazyScene>
  );
}
