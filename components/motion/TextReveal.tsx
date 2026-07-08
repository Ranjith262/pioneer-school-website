"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before animation starts. */
  delay?: number;
  /** Reveal per character or per word. */
  mode?: "word" | "char";
  tag?: "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  mode = "word",
  tag: Tag = "span",
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const units = mode === "char" ? text.split("") : text.split(" ");

  // Per-word 3D reveals read as content popping in on a fast phone scroll.
  if (isMobile) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mode === "char" ? 0.03 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const unitVariants = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 20, rotateX: 40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      style={{ display: "inline" }}
    >
      {units.map((unit, i) => (
        // The joining space lives BETWEEN the inline-blocks (a trailing
        // space inside one would collapse), so it both renders and stays
        // in the accessible text.
        <span key={`${unit}-${i}`}>
          <span
            className="inline-block overflow-hidden pb-0.5 align-bottom"
            style={{ perspective: 600 }}
          >
            <motion.span
              className="inline-block"
              variants={unitVariants}
            >
              {unit}
            </motion.span>
          </span>
          {mode === "word" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
