"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    /** Lenis instance for programmatic glides (ScrollTop etc.).
        Named __lenis because the lenis package reserves window.lenis
        for its own feature flags. */
    __lenis?: Lenis;
  }
}

/**
 * Site-wide inertia scrolling. Windows mouse wheels scroll in hard
 * ~100px notches, which makes the parallax/3D layers visibly jump;
 * Lenis eases each notch over a short glide so the whole page moves
 * like one continuous surface.
 *
 * Touch devices are untouched (Lenis leaves native touch scrolling
 * alone by default) — phones already scroll with native inertia.
 * Keyboard, scrollbar drags, and find-in-page also stay native.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      /* glide length per wheel notch — long enough to feel premium,
         short enough to never feel laggy */
      duration: 1.05,
      anchors: true,
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
