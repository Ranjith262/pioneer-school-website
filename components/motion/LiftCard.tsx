"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Premium hover treatment for feature cards: the card lifts 12px and
 * scales to 1.02 over ~300ms. Transform-only (GPU-composited), and
 * fully disabled when the OS asks for reduced motion. Shadow depth is
 * handled by the caller via CSS `group-hover` so it stays on the
 * compositor-friendly path too.
 */
export function LiftCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduceMotion ? undefined : { y: -12, scale: 1.02 }}
      transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
