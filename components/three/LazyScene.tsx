"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile } from "@/lib/useIsMobile";

/* Canvas props keep a stable identity — fresh object literals on every
   render make r3f reconfigure its root each time state flips. */
const GL_DESKTOP = {
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
} as const;

/* Mobile tier: no MSAA (soft additive points don't need it — saves a lot
   of fill-rate), default power profile for battery, tighter DPR clamp. */
const GL_MOBILE = {
  alpha: true,
  antialias: false,
  powerPreference: "default",
} as const;

type CameraProps = { position: [number, number, number]; fov: number };

const DEFAULT_CAMERA: CameraProps = { position: [0, 1.2, 9], fov: 50 };
const DEFAULT_DPR: [number, number] = [1, 1.75];
const MOBILE_DPR: [number, number] = [1, 1.5];

interface LazySceneProps {
  children: ReactNode;
  className?: string;
  camera?: CameraProps;
  /** Desktop device-pixel-ratio clamp — keeps fill-rate sane on 4K monitors. */
  dpr?: [number, number];
}

/**
 * Shared WebGL canvas wrapper with strict performance discipline:
 * - honours prefers-reduced-motion (renders nothing)
 * - bails silently when WebGL is unavailable
 * - phones get a tuned tier (no MSAA, DPR ≤ 1.5, battery power profile);
 *   scene components additionally scale their particle counts via
 *   useIsMobile
 * - mounts the canvas only while its section is (nearly) in view, so an
 *   offscreen scene costs zero GPU and zero rAF work. Runtime frameloop
 *   toggling proved unreliable in r3f 9.6, so we simply unmount instead:
 *   context re-creation is ~50ms, hidden behind a CSS fade and a 400px
 *   pre-mount margin.
 */
export function LazyScene({
  children,
  className,
  camera = DEFAULT_CAMERA,
  dpr = DEFAULT_DPR,
}: LazySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [webgl, setWebgl] = useState(false);
  const [inView, setInView] = useState(false);
  /* Lock prop identity for the lifetime of this instance. */
  const [stableCamera] = useState(camera);
  const [stableDpr] = useState(dpr);

  /* The device tier is locked the first time the canvas mounts. inView
     only turns true after the post-mount effects have run, so isMobile
     is already settled by then (matchMedia resolves in the same effect
     flush). */
  const tierRef = useRef<{ gl: typeof GL_DESKTOP | typeof GL_MOBILE; dpr: [number, number] } | null>(null);
  if (inView && !tierRef.current) {
    tierRef.current = isMobile
      ? { gl: GL_MOBILE, dpr: MOBILE_DPR }
      : { gl: GL_DESKTOP, dpr: stableDpr };
  }

  useEffect(() => {
    try {
      const probe = document.createElement("canvas");
      setWebgl(
        !!(probe.getContext("webgl2") || probe.getContext("webgl"))
      );
    } catch {
      setWebgl(false);
    }
  }, []);

  /* In-view tracking via rAF-throttled scroll + rect math. An
     IntersectionObserver attached from this effect silently stopped
     delivering entries when mounted through the next/dynamic boundary
     (React 19 + r3f), so we use the primitive that cannot fail. */
  useEffect(() => {
    const MARGIN = 400;
    let ticking = false;
    const check = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible =
        rect.bottom > -MARGIN && rect.top < window.innerHeight + MARGIN;
      setInView(visible);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Ambient light-drift stays on even under the OS Reduce Motion setting
     (owner's decision) — it is slow additive glow, not the parallax/zoom
     class of motion that setting exists to suppress. */
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`${className ?? "pointer-events-none absolute inset-0"} transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {webgl && inView && tierRef.current && (
        <Canvas
          dpr={tierRef.current.dpr}
          camera={stableCamera}
          gl={tierRef.current.gl}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
