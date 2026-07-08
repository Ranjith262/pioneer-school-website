"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: "🙏",
    title: "Respect",
    subtitle: "Pranaam",
    description:
      "Touching feet of elders and standing for teachers shows humility and reverence for knowledge — a daily ritual at Pioneer.",
    color: "from-[#FF9933]/20 to-[#FF9933]/5",
    border: "border-[#FF9933]/30",
  },
  {
    icon: "📚",
    title: "Wisdom",
    subtitle: "Guru-Shishya",
    description:
      "The ancient teacher-student bond, alive in every classroom. Our teachers mentor, not merely instruct.",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
  },
  {
    icon: "🪷",
    title: "Purity",
    subtitle: "Lotus",
    description:
      "Like the lotus that blooms in mud, our children rise above circumstances through education and self-belief.",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/30",
  },
  {
    icon: "⚡",
    title: "Energy",
    subtitle: "Shakti",
    description:
      "The boundless energy of childhood, channelled into academics, sports, arts, and community service.",
    color: "from-accent/20 to-accent/5",
    border: "border-accent/30",
  },
  {
    icon: "🌳",
    title: "Roots",
    subtitle: "Vat-Vriksha",
    description:
      "Like the banyan tree, we grow wide and strong. Rooted in Indian values, our branches reach toward the world.",
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/30",
  },
  {
    icon: "☸️",
    title: "Balance",
    subtitle: "Dharma Chakra",
    description:
      "Equal weight to marks and character, competition and compassion, ambition and humility.",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/30",
  },
];

export function ValuesJourney() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value, i) => (
        <motion.button
          key={value.title}
          type="button"
          onClick={() => setActive(active === i ? null : i)}
          aria-expanded={active === i}
          className={cn(
            "relative flex flex-col items-center rounded-card border bg-white p-7 text-center shadow-soft transition-all duration-300",
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

          <div className="relative">
            <motion.span
              aria-hidden="true"
              className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface text-4xl"
              animate={
                active === i && !reduceMotion
                  ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {value.icon}
            </motion.span>
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
  );
}
