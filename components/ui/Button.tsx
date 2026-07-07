"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-700 shadow-soft hover:shadow-lift",
  secondary:
    "bg-secondary text-white hover:bg-secondary-700 shadow-soft hover:shadow-lift",
  accent:
    "bg-accent text-ink hover:bg-accent-600 shadow-soft hover:shadow-lift",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-primary",
  ghost: "text-primary hover:bg-primary-50",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const baseClasses =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 overflow-hidden hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

function useRipple() {
  const ref = useRef<HTMLElement>(null);

  const createRipple = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${x - size / 2}px; top:${y - size / 2}px;
      background: currentColor; opacity: 0.15;
      transform: scale(0);
      animation: ripple-expand 0.6s ease-out forwards;
    `;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }, []);

  return { ref, createRipple };
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  const { ref, createRipple } = useRipple();

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      onClick={createRipple as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Link>
  );
}

interface SubmitButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
}: SubmitButtonProps) {
  const { ref, createRipple } = useRipple();

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="submit"
      disabled={disabled}
      onClick={createRipple as unknown as React.MouseEventHandler<HTMLButtonElement>}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
        className
      )}
    >
      {children}
    </button>
  );
}
