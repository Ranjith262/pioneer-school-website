"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const PHRASE_COUNT = 8;

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const { t } = useLanguage();
  const phrases = Array.from({ length: PHRASE_COUNT }, (_, i) => t(`marquee.${i}`));
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {phrases.map((phrase) => (
        <span
          key={phrase}
          className="flex items-center whitespace-nowrap px-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-base"
        >
          {phrase}
          <span aria-hidden="true" className="ml-12 text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

/* Perceived glide speed per breakpoint, in CSS px/second — matches the
   durations the CSS version used (mobile 40px/s was tuned from the
   user's phone recordings). */
function speedForViewport() {
  if (window.innerWidth >= 1024) return 76;
  if (window.innerWidth >= 640) return 52;
  return 40;
}

/**
 * ISB-style rolling values ticker. Pauses on hover; static text for
 * screen readers and reduced-motion users.
 *
 * Driven by requestAnimationFrame rather than a CSS animation: iOS
 * Safari silently dropped the CSS version — a `will-change: transform`
 * track ~3000 CSS px wide becomes a ~9600-device-px compositor layer at
 * 3× DPR, beyond what its compositor will animate. JS transforms have
 * no such limit, and the loop stops automatically in background tabs.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const shell = track.parentElement;

    let offset = 0;
    let last: number | null = null;
    let paused = false;
    let raf = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (last === null) {
        last = now;
        return;
      }
      /* clamp dt so returning from a background tab doesn't jump */
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      /* Keeps gliding under OS Reduce Motion (owner's decision) — a slow
         ticker with hover-pause, not vestibular-trigger motion. */
      if (paused) return;
      const strip = track.children[0] as HTMLElement | undefined;
      const width = strip?.offsetWidth ?? 0;
      if (width > 0) {
        offset = (offset + speedForViewport() * dt) % width;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
    };
    raf = requestAnimationFrame(tick);

    /* Hover-pause is a MOUSE affordance. Touch pointers also fire
       pointerenter (e.g. a thumb scrolling across the band), which would
       silently freeze the ticker on phones — so ignore them. */
    const pause = (e: PointerEvent) => {
      if (e.pointerType === "mouse") paused = true;
    };
    const resume = () => {
      paused = false;
    };
    shell?.addEventListener("pointerenter", pause);
    shell?.addEventListener("pointerleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      shell?.removeEventListener("pointerenter", pause);
      shell?.removeEventListener("pointerleave", resume);
    };
  }, []);

  return (
    <div className="marquee-shell overflow-hidden border-y border-white/10 bg-gradient-to-r from-primary-800 via-primary to-secondary-700 py-5">
      <div ref={trackRef} className="marquee-track">
        <Strip />
        <Strip ariaHidden />
      </div>
    </div>
  );
}
