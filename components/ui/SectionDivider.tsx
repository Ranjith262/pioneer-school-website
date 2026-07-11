interface SectionDividerProps {
  variant?: "wave" | "slope" | "curve";
  flip?: boolean;
  className?: string;
  color?: string;
}

export function SectionDivider({
  variant = "wave",
  flip = false,
  className = "",
  color = "currentColor",
}: SectionDividerProps) {
  const paths: Record<string, string> = {
    wave: "M0,64 C120,20 240,100 360,64 C480,28 600,100 720,64 C840,28 960,100 1080,64 C1200,28 1320,100 1440,64 L1440,128 L0,128 Z",
    slope: "M0,128 L0,64 Q720,0 1440,64 L1440,128 Z",
    curve: "M0,128 C360,128 720,0 1440,96 L1440,128 Z",
  };

  const animate = variant === "wave";

  return (
    <div
      aria-hidden="true"
      className={`relative -my-px w-full overflow-hidden leading-[0] ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      {animate ? (
        <div className="relative h-12 w-full sm:h-16 lg:h-20">
          <svg
            viewBox="0 0 2880 128"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 block h-full w-[200%]"
            fill={color}
            style={{ animation: "wave-drift 8s linear infinite" }}
          >
            <path d="M0,64 C120,20 240,100 360,64 C480,28 600,100 720,64 C840,28 960,100 1080,64 C1200,28 1320,100 1440,64 C1560,28 1680,100 1800,64 C1920,28 2040,100 2160,64 C2280,28 2400,100 2520,64 C2640,28 2760,100 2880,64 L2880,128 L0,128 Z" />
          </svg>
        </div>
      ) : (
        <svg
          viewBox="0 0 1440 128"
          preserveAspectRatio="none"
          className="block h-12 w-full sm:h-16 lg:h-20"
          fill={color}
        >
          <path d={paths[variant]} />
        </svg>
      )}
    </div>
  );
}
