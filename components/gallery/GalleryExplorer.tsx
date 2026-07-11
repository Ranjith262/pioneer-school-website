"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  galleryCategories,
  galleryItems,
  galleryYears,
} from "@/content/gallery";
import { Photo } from "@/components/ui/Photo";
import { galleryImages, img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function GalleryExplorer() {
  const [category, setCategory] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  const filtered = useMemo(
    () =>
      galleryItems.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          (year === "All" || item.year === year)
      ),
    [category, year]
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || filtered.length === 0) return current;
        return (current + delta + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, close, step]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const catLabel = (cat: string) =>
    cat === "All" ? t("common.all") : t(`content.categories.${cat}`);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {galleryCategories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => {
                setCategory(option);
                setLightboxIndex(null);
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                category === option
                  ? "bg-primary text-white shadow-soft"
                  : "bg-white text-ink shadow-soft hover:bg-primary-50"
              )}
            >
              {catLabel(option)}
            </button>
          ))}
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter by year">
          {galleryYears.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={year === option}
              onClick={() => {
                setYear(option);
                setLightboxIndex(null);
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                year === option
                  ? "bg-secondary text-white shadow-soft"
                  : "bg-white text-ink shadow-soft hover:bg-secondary-50"
              )}
            >
              {option === "All" ? t("common.all") : option}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-muted">
          {t("pages.gallery.noPhotos")}
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`${t("pages.gallery.openPhoto")}: ${t(`content.gallery.${item.id}`)}`}
                className="group relative block w-full overflow-hidden rounded-card text-left shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <Photo
                  src={(galleryImages[item.id] ?? img.kidsOutdoors).src}
                  alt={t(`content.gallery.${item.id}`)}
                  className="aspect-[4/3]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  imgClassName="transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-primary/70 via-primary/30 to-transparent opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lift transition-transform duration-300 group-hover:scale-100 scale-75">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-white p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="block font-heading text-sm font-semibold text-ink">
                    {t(`content.gallery.${item.id}`)}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {catLabel(item.category)} · {item.year}
                  </span>
                </span>
                <span className="block bg-white p-4 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="block font-heading text-sm font-semibold text-ink">
                    {t(`content.gallery.${item.id}`)}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {catLabel(item.category)} · {item.year}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(`content.gallery.${active.id}`)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <div
              className="relative w-full max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Photo
                src={(galleryImages[active.id] ?? img.kidsOutdoors).src}
                alt={t(`content.gallery.${active.id}`)}
                className="aspect-[4/3] rounded-card"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="mt-4 flex items-center justify-between gap-4 text-white">
                <div>
                  <p className="font-heading text-lg font-semibold">
                    {t(`content.gallery.${active.id}`)}
                  </p>
                  <p className="text-sm text-white/70">
                    {catLabel(active.category)} · {active.year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/25"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/25"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Close lightbox"
                className="absolute -top-3 right-0 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
