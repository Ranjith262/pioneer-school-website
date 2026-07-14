"use client";

import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

const GOLD = "#DFA10E";
const VIEW = { once: true, margin: "0px 0px 300px 0px" } as const;

const MobileCtx = createContext(false);

function P({
  d,
  delay = 0,
  w = 2.6,
  color,
  duration = 0.8,
}: {
  d: string;
  delay?: number;
  w?: number;
  color?: string;
  duration?: number;
}) {
  const mobile = useContext(MobileCtx);

  if (mobile) {
    return (
      <motion.path
        d={d}
        fill="none"
        stroke={color ?? "currentColor"}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, delay: delay + 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    );
  }

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={VIEW}
      transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}

function MobileCircle({
  cx,
  cy,
  r,
  color,
  sw,
  delay = 0,
  duration = 0.8,
}: {
  cx: string;
  cy: string;
  r: string;
  color: string;
  sw: number;
  delay?: number;
  duration?: number;
}) {
  const mobile = useContext(MobileCtx);
  const common = {
    cx,
    cy,
    r,
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    initial: { pathLength: 0, opacity: 0 } as const,
    transition: {
      duration,
      delay: mobile ? delay + 0.3 : delay,
      ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
    },
  };

  if (mobile) {
    return <motion.circle {...common} animate={{ pathLength: 1, opacity: 1 }} />;
  }
  return (
    <motion.circle
      {...common}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={VIEW}
    />
  );
}

function RespectEmblem() {
  return (
    <>
      <P d="M32 12 C25 19 21 29 22.5 39 C23.5 46.5 25.5 52 28 56" />
      <P d="M32 12 C39 19 43 29 41.5 39 C40.5 46.5 38.5 52 36 56" delay={0.15} />
      <P d="M30.5 23 C28 29 27.2 37 28.2 45" delay={0.35} w={2} />
      <P d="M33.5 23 C36 29 36.8 37 35.8 45" delay={0.45} w={2} />
      <motion.g
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <P d="M32 4 V9" delay={0.7} color={GOLD} w={2.2} />
        <P d="M20 8 L23.5 12.5" delay={0.8} color={GOLD} w={2.2} />
        <P d="M44 8 L40.5 12.5" delay={0.9} color={GOLD} w={2.2} />
      </motion.g>
    </>
  );
}

function WisdomEmblem() {
  return (
    <>
      <P d="M10 41 C18 36.5 26 36.5 32 41 C38 36.5 46 36.5 54 41" />
      <P d="M10 41 V49 C18 44.5 26 44.5 32 49 C38 44.5 46 44.5 54 49 V41" delay={0.2} duration={1} />
      <P d="M32 41 V49" delay={0.4} w={2} />
      <motion.g
        style={{ transformOrigin: "32px 33px", transformBox: "view-box" }}
        animate={{ scaleY: [1, 1.1, 0.94, 1], scaleX: [1, 0.96, 1.04, 1] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <P d="M32 15 C26.5 22 26.5 28 32 33 C37.5 28 37.5 23 32 15" delay={0.55} color={GOLD} />
        <P d="M32 22 C30 25 30 27.5 32 29.5" delay={0.8} color={GOLD} w={2} />
      </motion.g>
    </>
  );
}

function PurityEmblem() {
  return (
    <motion.g
      style={{ transformOrigin: "32px 36px", transformBox: "view-box" }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
    >
      <P d="M32 12 C37.5 20 37.5 31 32 38 C26.5 31 26.5 20 32 12" />
      <P d="M32 38 C24 34 20.5 26 22 17.5 C28 21.5 31 29 32 38" delay={0.25} />
      <P d="M32 38 C40 34 43.5 26 42 17.5 C36 21.5 33 29 32 38" delay={0.35} />
      <P d="M32 38 C23 39 15 34.5 11.5 27.5 C20 27 28 31.5 32 38" delay={0.5} />
      <P d="M32 38 C41 39 49 34.5 52.5 27.5 C44 27 36 31.5 32 38" delay={0.6} />
      <P d="M17 47 C24 44 40 44 47 47" delay={0.85} color={GOLD} w={2.2} />
    </motion.g>
  );
}

function EnergyEmblem() {
  return (
    <>
      <motion.g
        style={{ transformOrigin: "32px 32px", transformBox: "view-box" }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, -1.5, 1, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <P d="M36 8 L21 35 H30 L26 56 L44 27 H35 L41 8 Z" duration={1.1} />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
      >
        <P d="M13 20 H19" delay={0.9} color={GOLD} w={2.2} />
        <P d="M11 30 H16" delay={1} color={GOLD} w={2.2} />
        <P d="M48 42 H53" delay={1.1} color={GOLD} w={2.2} />
      </motion.g>
    </>
  );
}

function RootsEmblem() {
  return (
    <>
      <P d="M14 32 C14 16 50 16 50 32" duration={1} />
      <P d="M21 32 C21 23.5 43 23.5 43 32" delay={0.3} />
      <P d="M32 33 V54" delay={0.5} />
      <motion.g
        style={{ transformOrigin: "32px 26px", transformBox: "view-box" }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <P d="M20 31 V43" delay={0.65} w={2} />
        <P d="M44 31 V43" delay={0.75} w={2} />
        <P d="M26 32 V39.5" delay={0.85} w={2} />
        <P d="M38 32 V39.5" delay={0.95} w={2} />
      </motion.g>
      <P d="M17 54 H47" delay={1.05} color={GOLD} w={2.2} />
    </>
  );
}

function BalanceEmblem() {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x1 = 32 + 7.5 * Math.cos(a);
    const y1 = 32 + 7.5 * Math.sin(a);
    const x2 = 32 + 16.5 * Math.cos(a);
    const y2 = 32 + 16.5 * Math.sin(a);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <>
      <MobileCircle cx="32" cy="32" r="20" color="currentColor" sw={2.6} duration={1.1} />
      <motion.g
        style={{ transformOrigin: "32px 32px", transformBox: "view-box" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <MobileCircle cx="32" cy="32" r="4.5" color={GOLD} sw={2.4} delay={0.4} duration={0.7} />
        {spokes.map((d, i) => (
          <P key={d} d={d} delay={0.5 + i * 0.07} w={2.2} duration={0.4} />
        ))}
      </motion.g>
    </>
  );
}

const EMBLEMS = {
  respect: RespectEmblem,
  wisdom: WisdomEmblem,
  purity: PurityEmblem,
  energy: EnergyEmblem,
  roots: RootsEmblem,
  balance: BalanceEmblem,
} as const;

export type EmblemKind = keyof typeof EMBLEMS;

export function ValueEmblem({
  kind,
  className,
}: {
  kind: EmblemKind;
  className?: string;
}) {
  const Emblem = EMBLEMS[kind];
  const mobile = useIsMobile();
  return (
    <MobileCtx.Provider value={mobile}>
      <svg
        viewBox="0 0 64 64"
        className={className}
        aria-hidden="true"
        role="presentation"
      >
        <Emblem />
      </svg>
    </MobileCtx.Provider>
  );
}
