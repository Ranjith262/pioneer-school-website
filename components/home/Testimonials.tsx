"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { testimonials } from "@/content/testimonials";

const ROTATE_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATE_MS
    );
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  const current = testimonials[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mx-auto max-w-3xl"
    >
      <div aria-live="polite" className="relative min-h-56 sm:min-h-44">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <blockquote className="text-lg leading-relaxed text-ink sm:text-xl">
              <span aria-hidden="true" className="mr-1 font-heading text-4xl text-accent">
                “
              </span>
              {current.quote}
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-heading font-semibold text-ink">{current.name}</p>
              <p className="text-sm text-secondary">{current.role}</p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2.5" role="tablist" aria-label="Testimonials">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.name}
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial from ${testimonial.name}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-2.5 bg-primary-100 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
