/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

import type { GradientVariant } from "@/types";

/** Brand gradient utilities used by image placeholders across the site. */
export const gradients: Record<GradientVariant, string> = {
  blue: "bg-gradient-to-br from-primary to-primary-800",
  green: "bg-gradient-to-br from-secondary to-secondary-700",
  gold: "bg-gradient-to-br from-accent to-accent-600",
  sky: "bg-gradient-to-br from-sky-400 to-primary",
  teal: "bg-gradient-to-br from-teal-400 to-secondary-700",
  violet: "bg-gradient-to-br from-indigo-400 to-primary-800",
};
