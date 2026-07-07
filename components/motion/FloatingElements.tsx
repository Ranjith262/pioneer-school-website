"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}

const particles: Particle[] = [
  { x: "12%", y: "18%", size: 3, delay: 0, duration: 7 },
  { x: "85%", y: "25%", size: 4, delay: 1.5, duration: 9 },
  { x: "30%", y: "72%", size: 2.5, delay: 0.8, duration: 8 },
  { x: "72%", y: "60%", size: 3.5, delay: 2.2, duration: 6 },
  { x: "50%", y: "35%", size: 2, delay: 3, duration: 10 },
  { x: "20%", y: "55%", size: 3, delay: 1, duration: 7.5 },
  { x: "90%", y: "75%", size: 2, delay: 0.5, duration: 8.5 },
  { x: "60%", y: "15%", size: 4, delay: 2, duration: 9.5 },
];

export function FloatingElements() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/30"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 8, -5, 3, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            scale: [1, 1.4, 1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
