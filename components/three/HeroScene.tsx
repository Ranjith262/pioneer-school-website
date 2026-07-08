"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useIsMobile } from "@/lib/useIsMobile";
import { LazyScene } from "./LazyScene";
import { LightDust } from "./LightDust";

/* ── Camera rig — a whisper of parallax.
      Desktop follows the pointer; phones (no cursor) get a slow
      autonomous drift so the scene still breathes. ─────────────── */

function CameraRig() {
  const isMobile = useIsMobile();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile]);

  useFrame((state) => {
    const cam = state.camera;
    if (isMobile) {
      const t = state.clock.elapsedTime;
      const tx = Math.sin(t * 0.12) * 0.35;
      const ty = 0.2 + Math.sin(t * 0.08 + 1.7) * 0.18;
      cam.position.x += (tx - cam.position.x) * 0.02;
      cam.position.y += (ty - cam.position.y) * 0.02;
    } else {
      cam.position.x += (target.current.x * 0.45 - cam.position.x) * 0.03;
      cam.position.y += (0.2 - target.current.y * 0.25 - cam.position.y) * 0.03;
    }
    cam.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Hero scene: "sparks of the morning diya" ─────────────────────
   No geometry, no gimmicks — two depth-separated layers of soft golden
   light drifting up through the dawn photograph, parting around the
   cursor on desktop. Phones run the same scene at a tuned density
   (fields sized to the narrow viewport so density stays constant). */

const HERO_CAMERA = { position: [0, 0.2, 9] as [number, number, number], fov: 50 };

export function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <LazyScene camera={HERO_CAMERA}>
      {/* far layer — fine dust, barely there, gives the air depth */}
      <LightDust
        count={isMobile ? 130 : 280}
        area={isMobile ? [12, 15, 6] : [34, 14, 6]}
        center={[0, 0, -3]}
        colorA="#ffe9c2"
        colorB="#e8b23a"
        rise={0.22}
        opacity={0.65}
        bokehRatio={0.08}
      />
      {/* near layer — larger embers; they part around the cursor on desktop */}
      <LightDust
        count={isMobile ? 60 : 140}
        area={isMobile ? [10, 12, 3] : [30, 11, 3]}
        center={[0, -0.5, 1]}
        colorA="#fff3cf"
        colorB="#f5b301"
        rise={0.4}
        opacity={1}
        repel={isMobile ? 0 : 0.9}
        bokehRatio={0.24}
      />
      <CameraRig />
    </LazyScene>
  );
}
