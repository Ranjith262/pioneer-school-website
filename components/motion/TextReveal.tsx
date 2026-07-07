"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  const units = mode === "char" ? text.split("") : text.split(" ");

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
        <span
          key={`${unit}-${i}`}
          className="inline-block overflow-hidden pb-0.5 align-bottom"
          style={{ perspective: 600 }}
        >
          <motion.span
            className="inline-block"
            variants={unitVariants}
          >
            {unit}
            {mode === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
