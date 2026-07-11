"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { achievements } from "@/content/achievements";
import { useIsMobile } from "@/lib/useIsMobile";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const categoryColors: Record<string, string> = {
  "Academics": "from-primary to-primary-700",
  "Sports": "from-secondary to-secondary-700",
  "Arts & Culture": "from-accent to-accent-600",
  "Community": "from-indigo-500 to-primary-800",
};

export function AchievementsSlider() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const noEntrance = reduceMotion || isMobile;

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="flex snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
        aria-label="School achievements"
      >
        {achievements.map((achievement, i) => (
          <motion.li
            key={achievement.title}
            initial={noEntrance ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group w-80 shrink-0 snap-start"
          >
            <div className="relative h-full overflow-hidden rounded-card border border-primary-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
              {/* Top gradient accent */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  categoryColors[achievement.category] ?? "from-primary to-secondary"
                }`}
              />

              <div className="flex items-start justify-between gap-3">
                <motion.span
                  aria-hidden="true"
                  className="text-4xl"
                  whileHover={reduceMotion ? undefined : { rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {achievement.emoji}
                </motion.span>
                <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                  {achievement.year}
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                {t(`content.categories.${achievement.category}`)}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-ink">
                {t(`content.achievements.${i}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`content.achievements.${i}.description`)}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll achievements backward"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-100 bg-white text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-lift"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Scroll achievements forward"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-100 bg-white text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-lift"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
