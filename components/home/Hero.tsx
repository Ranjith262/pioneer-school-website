"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { site } from "@/content/site";
import { img } from "@/lib/images";
import { useIsMobile } from "@/lib/useIsMobile";
import { ButtonLink } from "@/components/ui/Button";
import { Hero3D } from "@/components/three/Hero3D";

function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        // The joining space lives BETWEEN the inline-blocks (a trailing
        // space inside one would collapse), so it both renders and stays
        // in the accessible text.
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              initial={reduceMotion ? false : { y: "110%", rotateX: 45 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{
                duration: 0.85,
                delay: delay + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  // Scroll-linked transforms repaint every frame — too heavy for phone GPUs.
  const staticHero = reduceMotion || isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax: each layer moves at different speed
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.65, 0.85]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white"
    >
      {/* Sunrise theatrics are desktop-only: on phones the show reads as a
          broken black screen, so the photo appears immediately instead. */}
      {!staticHero && (
        <>
          {/* Layer 0: Animated sunrise sky gradient */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ y: bgY }}
          >
            <div
              className="absolute inset-[-10%] will-change-[background-position]"
              style={{
                backgroundImage:
                  "linear-gradient(to top, #1a0a2e 0%, #2d1b69 15%, #7b2d5f 30%, #d4574e 45%, #f09839 58%, #f5c842 70%, #87ceeb 90%)",
                backgroundSize: "100% 300%",
                animation: "sunrise-sky 14s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              }}
            />
          </motion.div>

          {/* Layer 0b: Animated sun glow orb */}
          <div
            aria-hidden="true"
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 will-change-transform"
            style={{
              width: "clamp(200px, 35vw, 500px)",
              height: "clamp(200px, 35vw, 500px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,184,1,0.7) 0%, rgba(240,152,57,0.4) 35%, rgba(213,87,78,0) 70%)",
              animation: "sunrise-glow 14s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              opacity: 0,
            }}
          />

          {/* Layer 0c: Animated light rays */}
          <div
            aria-hidden="true"
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 hidden sm:block will-change-transform"
            style={{
              width: "clamp(400px, 70vw, 1200px)",
              height: "clamp(400px, 70vw, 1200px)",
              background: `conic-gradient(
                from 0deg,
                transparent 0deg, rgba(245,179,1,0.12) 8deg, transparent 16deg,
                transparent 30deg, rgba(255,153,51,0.1) 38deg, transparent 46deg,
                transparent 60deg, rgba(245,179,1,0.08) 68deg, transparent 76deg,
                transparent 90deg, rgba(255,153,51,0.1) 98deg, transparent 106deg,
                transparent 120deg, rgba(245,179,1,0.12) 128deg, transparent 136deg,
                transparent 150deg, rgba(255,153,51,0.08) 158deg, transparent 166deg,
                transparent 180deg
              )`,
              animation: "sunrise-rays 14s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              opacity: 0,
            }}
          />
        </>
      )}

      {/* Layer 1: Background image with Ken Burns (fades in over sunrise) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={staticHero ? undefined : { y: bgY }}
      >
        <motion.div
          className="absolute inset-[-8%] will-change-transform"
          initial={
            reduceMotion ? false : staticHero ? { opacity: 0 } : { scale: 1.12, opacity: 0 }
          }
          animate={
            reduceMotion ? undefined : staticHero ? { opacity: 1 } : { scale: 1, opacity: 1 }
          }
          transition={
            staticHero
              ? { opacity: { duration: 0.5, ease: "easeOut" } }
              : { duration: 18, ease: "linear", opacity: { duration: 4, delay: 5, ease: "easeInOut" } }
          }
        >
          <Image
            src={img.heroClassroom.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Layer 1b: Dawn haze overlay (fades out as sunrise completes) */}
      {!staticHero && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/50 via-[#d4574e]/15 to-transparent"
          style={{ animation: "sunrise-haze 12s ease-out forwards" }}
        />
      )}

      {/* Layer 2: Color overlay (shifts opacity on scroll) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-primary-800/15"
        style={staticHero ? undefined : { opacity: overlayOpacity }}
      />

      {/* Layer 3: Mid-ground decorative elements */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={staticHero ? undefined : { y: midY }}
      >
        {/* Saffron diagonal accent */}
        <div className="absolute -right-20 top-1/4 h-80 w-[400px] rotate-12 bg-gradient-to-b from-[#FF9933]/10 to-transparent blur-3xl" />
        {/* Green diagonal accent */}
        <div className="absolute -left-16 bottom-1/4 h-64 w-[350px] -rotate-12 bg-gradient-to-t from-[#138808]/8 to-transparent blur-3xl" />
      </motion.div>

      {/* Layer 4: WebGL dawn sparks — depth-layered golden light dust
          drifting upward, parting around the cursor on desktop. Phones
          run the same scene at a battery-tuned density (see LazyScene);
          only reduced-motion opts out entirely. */}
      {!reduceMotion && <Hero3D />}

      {/* Layer 5: Content (parallax up on scroll, fades) */}
      <motion.div
        style={
          staticHero
            ? undefined
            : { y: contentY, opacity: contentOpacity, scale: contentScale }
        }
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-44 sm:px-6 lg:px-8"
      >
        {/* Indian tricolour badge */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide backdrop-blur-md"
        >
          <span aria-hidden="true" className="relative flex h-2.5 w-9 overflow-hidden rounded-full">
            <span className="w-1/3 bg-[#FF9933]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#138808]" />
            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="7" height="7" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="#000080" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="2" fill="#000080"/>
              {Array.from({length: 24}).map((_, i) => (
                <line key={i} x1="12" y1="4" x2="12" y2="2.5" stroke="#000080" strokeWidth="0.8" transform={`rotate(${i * 15} 12 12)`}/>
              ))}
            </svg>
          </span>
          Nursery to Class 10 · Bhagyanagar, Koppal, Karnataka · Est. {site.established}
        </motion.p>

        {/* Headline with word-by-word reveal + 3D rotation */}
        <h1 className="max-w-5xl font-heading text-5xl font-bold leading-[1.05] sm:text-7xl lg:text-[5.5rem]">
          <RevealWords text="Learning Today." delay={0.25} />
          <br />
          <RevealWords
            text="Leading Tomorrow."
            delay={0.6}
            className="font-display italic font-medium text-accent"
          />
        </h1>

        {/* Subtagline */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
        >
          {site.subTagline}
        </motion.p>

        {/* CTA buttons with stagger */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/admissions#apply" variant="accent" size="lg">
            Apply Now <span className="arrow-bounce">→</span>
          </ButtonLink>
          <ButtonLink href="/admissions#visit" variant="outline" size="lg">
            Book a Campus Tour
          </ButtonLink>
        </motion.div>

        {/* Stats bar - visible on larger screens */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-14 hidden items-center gap-10 border-t border-white/15 pt-6 sm:flex"
        >
          {[
            { value: "300+", label: "Students" },
            { value: "100%", label: "SSLC Pass Rate" },
            { value: "20+", label: "Expert Teachers" },
            { value: "Since 2015", label: "Serving Koppal" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-medium text-accent">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator - animated pill */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <motion.span
            className="h-2.5 w-1 rounded-full bg-accent"
            animate={reduceMotion ? undefined : { y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
