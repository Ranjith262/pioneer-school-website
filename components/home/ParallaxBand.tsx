"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SiteImage } from "@/lib/images";
import { useIsMobile } from "@/lib/useIsMobile";
import { BandSparks3D } from "@/components/three/BandSparks3D";

interface ParallaxBandProps {
  image: SiteImage;
  children: React.ReactNode;
}

/** Full-bleed photographic band with a gentle scroll parallax (desktop only). */
export function ParallaxBand({ image, children }: ParallaxBandProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const staticBand = reduceMotion || isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-white">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-[20%] h-[140%] will-change-transform"
        style={staticBand ? undefined : { y }}
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/65" />
      </motion.div>
      {/* golden embers rising through the photograph — all devices;
          the scene self-tunes for phones, reduced-motion opts out */}
      {!reduceMotion && <BandSparks3D />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
