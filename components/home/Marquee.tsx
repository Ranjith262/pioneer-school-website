const phrases = [
  "Academic Excellence",
  "Rooted in Indian Values",
  "Confident English",
  "Science & Discovery",
  "Sports & Sportsmanship",
  "Music, Art & Theatre",
  "A Family of 300+ Learners",
  "Character Before Marks",
];

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {phrases.map((phrase) => (
        <span
          key={phrase}
          className="flex items-center whitespace-nowrap px-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-base"
        >
          {phrase}
          <span aria-hidden="true" className="ml-12 text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

/** ISB-style rolling values ticker. Pauses on hover; static text for screen readers. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-gradient-to-r from-primary-800 via-primary to-secondary-700 py-5">
      <div className="group relative flex">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <Strip />
          <Strip ariaHidden />
        </div>
      </div>
    </div>
  );
}
