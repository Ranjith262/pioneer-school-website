/**
 * Owner decision (2026-07-09): the site animates for EVERY visitor,
 * including devices with the OS "Reduce Motion" accessibility setting.
 * The owner tested on such a device and requires the full experience;
 * the site's motion is gentle ambient drift, not vestibular-trigger
 * parallax/zoom.
 *
 * Drop-in replacement for framer-motion's useReducedMotion — every
 * component imports it from here. To restore OS-setting compliance,
 * re-export the real hook from "framer-motion" instead.
 */
export function useReducedMotion(): boolean {
  return false;
}
