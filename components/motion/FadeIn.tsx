"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
}

/* Scroll-entrance animations are desktop-only. On phones, content hidden
   until it crosses the viewport threshold reads as blank flashes during a
   fast thumb-scroll — so mobile renders everything immediately. */

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const offset = reduceMotion ? offsets.none : offsets[direction];

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child, in seconds. */
  interval?: number;
}

export function Stagger({ children, className, interval = 0.1 }: StaggerProps) {
  const isMobile = useIsMobile();

  // Plain container on mobile: StaggerItem variants stay dormant without a
  // parent controller, so children render visible.
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: interval } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
