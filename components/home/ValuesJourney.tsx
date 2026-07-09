"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { ValueEmblem, type EmblemKind } from "@/components/home/ValueEmblems";

const values: Array<{
  emblem: EmblemKind;
  emblemClass: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  border: string;
}> = [
  {
    emblem: "respect",
    emblemClass: "text-[#E2701A]",
    title: "Respect",
    subtitle: "Pranaam",
    description:
      "Touching feet of elders and standing for teachers shows humility and reverence for knowledge — a daily ritual at Pioneer.",
    color: "from-[#FF9933]/20 to-[#FF9933]/5",
    border: "border-[#FF9933]/30",
  },
  {
    emblem: "wisdom",
    emblemClass: "text-primary",
    title: "Wisdom",
    subtitle: "Guru-Shishya",
    description:
      "The ancient teacher-student bond, alive in every classroom. Our teachers mentor, not merely instruct.",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
  },
  {
    emblem: "purity",
    emblemClass: "text-pink-600",
    title: "Purity",
    subtitle: "Lotus",
    description:
      "Like the lotus that blooms in mud, our children rise above circumstances through education and self-belief.",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/30",
  },
  {
    emblem: "energy",
    emblemClass: "text-[#D98E04]",
    title: "Energy",
    subtitle: "Shakti",
    description:
      "The boundless energy of childhood, channelled into academics, sports, arts, and community service.",
    color: "from-accent/20 to-accent/5",
    border: "border-accent/30",
  },
  {
    emblem: "roots",
    emblemClass: "text-secondary",
    title: "Roots",
    subtitle: "Vat-Vriksha",
    description:
      "Like the banyan tree, we grow wide and strong. Rooted in Indian values, our branches reach toward the world.",
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/30",
  },
  {
    emblem: "balance",
    emblemClass: "text-indigo-600",
    title: "Balance",
    subtitle: "Dharma Chakra",
    description:
      "Equal weight to marks and character, competition and compassion, ambition and humility.",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/30",
  },
];

/** Faint sacred-geometry wheel slowly turning behind the six pillars. */
function MandalaBackdrop() {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          width="760"
          height="760"
          viewBox="0 0 760 760"
          fill="none"
          stroke="#B8860B"
          strokeWidth="1.5"
          className="mandala-spin opacity-[0.06]"
        >
          <circle cx="380" cy="380" r="150" />
          <circle cx="380" cy="380" r="235" />
          <circle cx="380" cy="380" r="318" />
          <circle cx="380" cy="380" r="372" />
          {petals.map((deg) => (
            <path
              key={deg}
              d="M380 152 C398 190 398 232 380 266 C362 232 362 190 380 152"
              transform={`rotate(${deg} 380 380)`}
            />
          ))}
          {petals.map((deg) => (
            <circle
              key={`dot-${deg}`}
              cx="380"
              cy="94"
              r="4"
              transform={`rotate(${deg + 11.25} 380 380)`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

export function ValuesJourney() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative isolate">
      <MandalaBackdrop />
      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, i) => (
          <motion.button
            key={value.title}
            type="button"
            onClick={() => setActive(active === i ? null : i)}
            aria-expanded={active === i}
            className={cn(
              "relative flex flex-col items-center overflow-hidden rounded-card border bg-white p-7 text-center shadow-soft transition-all duration-300",
              active === i
                ? `${value.border} shadow-lift -translate-y-1`
                : "border-primary-100 hover:-translate-y-1 hover:shadow-lift"
            )}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {/* Glow background */}
            <div
              className={cn(
                "absolute inset-0 rounded-card bg-gradient-to-b opacity-0 transition-opacity duration-300",
                value.color,
                active === i && "opacity-100"
              )}
            />

            {/* Diya sparks drifting up inside the opened card */}
            {active === i &&
              [14, 32, 52, 70, 86].map((left, k) => (
                <span
                  key={k}
                  aria-hidden="true"
                  className="value-spark"
                  style={{ left: `${left}%`, animationDelay: `${k * 0.45}s` }}
                />
              ))}

            <div className="relative">
              <span
                className={cn(
                  "relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface",
                  value.emblemClass
                )}
              >
                {/* Golden ripple ring on open */}
                {active === i && (
                  <motion.span
                    key={`ripple-${i}`}
                    aria-hidden="true"
                    initial={{ scale: 0.7, opacity: 0.7 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-accent"
                  />
                )}
                <ValueEmblem kind={value.emblem} className="h-10 w-10" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-ink">
                {value.title}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-secondary">
                {value.subtitle}
              </p>

              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="mt-4 overflow-hidden text-sm leading-relaxed text-muted"
                  >
                    {value.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
