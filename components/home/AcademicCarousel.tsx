"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { programs } from "@/content/programs";
import { programImages, img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

const stageColors = [
  "bg-secondary",
  "bg-accent",
  "bg-accent-600",
  "bg-primary",
  "bg-primary-700",
  "bg-primary-800",
];

export function AcademicCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > index ? 1 : -1);
      setIndex(newIndex);
    },
    [index]
  );

  const next = useCallback(
    () => go((index + 1) % programs.length),
    [index, go]
  );
  const prev = useCallback(
    () => go((index - 1 + programs.length) % programs.length),
    [index, go]
  );

  const program = programs[index];
  const photo = programImages[program.slug] ?? img.kidsWriting;

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* Image side */}
      <div className="relative overflow-hidden rounded-card shadow-lift">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={program.slug}
            custom={direction}
            variants={reduceMotion ? undefined : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Photo
              src={photo.src}
              alt={photo.alt}
              className="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-4 flex gap-1.5">
          {programs.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to ${programs[i].name}`}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index
                  ? `w-8 ${stageColors[i]}`
                  : "w-2 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>

        {/* Stage number badge */}
        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 font-display text-xl font-bold text-primary shadow-soft backdrop-blur">
          {index + 1}/{programs.length}
        </div>
      </div>

      {/* Content side */}
      <div>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={program.slug}
            custom={direction}
            variants={reduceMotion ? undefined : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {program.ageRange}
            </p>
            <h3 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {program.name}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {program.summary}
            </p>
            <Link
              href={`/academics/${program.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent"
            >
              Explore Curriculum <span className="arrow-bounce">→</span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous program"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-100 bg-white text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-lift"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next program"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-100 bg-white text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-lift"
          >
            →
          </button>
          <span className="ml-3 text-sm text-muted">
            Swipe or click to explore all programs
          </span>
        </div>
      </div>
    </div>
  );
}
