import { cn, gradients } from "@/lib/utils";
import type { GradientVariant } from "@/types";

interface ImagePlaceholderProps {
  label: string;
  emoji?: string;
  gradient?: GradientVariant;
  className?: string;
  /** Visually hide the label (still available to screen readers). */
  hideLabel?: boolean;
}

/**
 * Branded stand-in for real school photography. Replace with <Image> once
 * authentic photos are available — see the Image Guidelines in README.md.
 */
export function ImagePlaceholder({
  label,
  emoji,
  gradient = "blue",
  className,
  hideLabel = false,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        gradients[gradient],
        className
      )}
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 p-4 text-center">
        {emoji && (
          <span aria-hidden="true" className="text-5xl drop-shadow-sm sm:text-6xl">
            {emoji}
          </span>
        )}
        {!hideLabel && (
          <span className="text-sm font-medium text-white/90">{label}</span>
        )}
      </div>
    </div>
  );
}
