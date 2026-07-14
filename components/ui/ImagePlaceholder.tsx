import { cn, gradients } from "@/lib/utils";
import type { GradientVariant } from "@/types";
import { SiteIcon } from "@/components/ui/SiteIcon";

interface ImagePlaceholderProps {
  label: string;
  icon?: string;
  gradient?: GradientVariant;
  className?: string;
  hideLabel?: boolean;
}

export function ImagePlaceholder({
  label,
  icon,
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
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 p-4 text-center">
        {icon && (
          <SiteIcon name={icon} className="h-12 w-12 text-white/80 sm:h-14 sm:w-14" />
        )}
        {!hideLabel && (
          <span className="text-sm font-medium text-white/90">{label}</span>
        )}
      </div>
    </div>
  );
}
