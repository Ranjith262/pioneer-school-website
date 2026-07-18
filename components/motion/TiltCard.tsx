"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. */
  maxTilt?: number;
  /** Glare overlay on hover. */
  glare?: boolean;
  /** Also lift + scale the card on hover (premium card treatment). */
  lift?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  glare = true,
  lift = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -maxTilt * 2);
    rotateY.set((x - 0.5) * maxTilt * 2);
    glareX.set(x * 100);
    glareY.set(y * 100);
    glareOpacity.set(0.15);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={lift && !reduceMotion ? { y: -12, scale: 1.02 } : undefined}
      transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 800,
              transformStyle: "preserve-3d",
            }
      }
    >
      {children}
      {glare && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
