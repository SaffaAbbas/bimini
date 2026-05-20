"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GALLERY_FILTERS,
  galleryImages,
  type GalleryFilterId,
  type GalleryImage,
} from "../data/gallery-images";
import {
  sectionContentGap,
  sectionY,
  sectionYCompact,
} from "../lib/section-spacing";
import { easeOut, fadeUp, tapScale, viewportOnce } from "../lib/motion";
import { AnimatedAnchor } from "./AnimatedButton";
import { RevealSection } from "./RevealSection";
import { SectionHeading } from "./SectionHeading";

type GallerySectionProps = {
  variant?: "marquee" | "masonry";
  showHeading?: boolean;
  showViewAll?: boolean;
  showFilters?: boolean;
  compact?: boolean;
  className?: string;
  id?: string;
  images?: readonly GalleryImage[];
};

const MASONRY_SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "lg:col-span-2",
  "",
  "sm:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "sm:row-span-2",
  "",
  "lg:row-span-2",
  "",
  "lg:col-span-2",
] as const;

function filterImages(
  images: readonly GalleryImage[],
  filter: GalleryFilterId,
) {
  if (filter === "all") return images;
  return images.filter((img) => img.tag === filter);
}

function useGalleryLightbox(images: readonly GalleryImage[]) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const close = useCallback(() => setIndex(null), []);
  const open = useCallback((i: number) => {
    setDirection(0);
    setIndex(i);
  }, []);
  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) =>
      i == null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i == null ? null : (i + 1) % images.length));
  }, [images.length]);
  const goTo = useCallback((target: number) => {
    setIndex((current) => {
      if (current != null) setDirection(target > current ? 1 : target < current ? -1 : 0);
      return target;
    });
  }, []);

  return { index, direction, open, close, prev, next, goTo };
}

function GalleryLightbox({
  images,
  index,
  direction,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  images: readonly GalleryImage[];
  index: number;
  direction: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}) {
  const image = images[index];
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [image, onClose, onPrev, onNext]);

  if (!image) return null;

  const slideX = direction >= 0 ? 48 : -48;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col bg-black/92 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="Image preview"
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        if (start == null) return;
        const end = e.changedTouches[0]?.clientX ?? start;
        const delta = end - start;
        if (delta > 56) onPrev();
        else if (delta < -56) onNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex shrink-0 items-center justify-between px-3 py-3 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60">
          {index + 1} / {images.length}
        </p>
        <motion.button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 transition hover:bg-white/25"
          aria-label="Close preview"
          whileTap={tapScale}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-14 py-2 sm:px-20 sm:py-4">
        {images.length > 1 ? (
          <>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:scale-105 hover:bg-white/25 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Previous image"
              whileTap={tapScale}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:scale-105 hover:bg-white/25 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Next image"
              whileTap={tapScale}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        ) : null}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={image.src}
            custom={direction}
            initial={{ opacity: 0, x: slideX, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -slideX, scale: 0.96 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="flex size-full min-h-0 min-w-0 flex-col items-center justify-center overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="block h-auto w-auto max-h-[calc(100dvh-13.5rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] max-w-[calc(100vw-7rem)] object-contain object-center shadow-2xl sm:max-h-[calc(100dvh-12rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] sm:max-w-[min(calc(100vw-10rem),64rem)]"
            />
            {image.caption ? (
              <figcaption className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-center text-sm text-white/90 backdrop-blur-sm">
                {image.caption}
              </figcaption>
            ) : null}
          </motion.figure>
        </AnimatePresence>
      </div>

      {images.length > 1 ? (
        <div
          className="shrink-0 border-t border-white/10 px-3 py-3 sm:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-2.5">
            {images.map((thumb, i) => {
              const active = i === index;
              return (
                <motion.button
                  key={thumb.src}
                  type="button"
                  onClick={() => onGoTo(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-24 ${
                    active
                      ? "ring-[color:var(--brand-accent)]"
                      : "ring-white/20 opacity-70 hover:opacity-100"
                  }`}
                  whileTap={tapScale}
                  aria-label={`View image ${i + 1}`}
                  aria-current={active}
                >
                  <img
                    src={thumb.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  {active ? (
                    <span className="absolute inset-0 ring-2 ring-inset ring-[color:var(--brand-accent)]/50" />
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

function GalleryTile({
  img,
  onClick,
  eager,
  className = "",
}: {
  img: GalleryImage;
  onClick: () => void;
  eager?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [shine, setShine] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => !reduceMotion && setShine(true)}
      onMouseLeave={() => setShine(false)}
      className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md ring-1 ring-slate-200/80 transition-shadow duration-300 hover:shadow-xl hover:ring-[color:var(--brand-primary)]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)] ${className}`}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      whileTap={tapScale}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
      />
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--brand-deep)]/50 via-[color:var(--brand-deep)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden
      />
      {shine ? (
        <span
          className="gallery-tile-shine pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          aria-hidden
        />
      ) : null}
      <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-[color:var(--brand-primary)] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
        </svg>
        View
      </span>
    </motion.button>
  );
}

function GalleryFilters({
  active,
  counts,
  onChange,
}: {
  active: GalleryFilterId;
  counts: Record<GalleryFilterId, number>;
  onChange: (id: GalleryFilterId) => void;
}) {
  return (
    <motion.div
      className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-2.5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      {GALLERY_FILTERS.map((f) => {
        const selected = active === f.id;
        const count = counts[f.id];
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              selected ? "text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {selected ? (
              <motion.span
                layoutId="gallery-filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[color:var(--brand-primary)] to-[color:var(--brand-ocean)] shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-1.5">
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums ${
                  selected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

function MarqueeGallery({ images }: { images: readonly GalleryImage[] }) {
  const reduceMotion = useReducedMotion();
  const strip = reduceMotion ? images : [...images, ...images];
  const { index, direction, open, close, prev, next, goTo } =
    useGalleryLightbox(images);

  return (
    <>
      <motion.div
        className="gallery-marquee-wrap relative w-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-center text-xs font-semibold text-slate-500 sm:hidden">
          Swipe or tap a photo · hover to pause
        </p>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20 lg:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20 lg:w-28"
          aria-hidden
        />
        <div
          className={
            reduceMotion
              ? "scrollbar-hide flex gap-3 overflow-x-auto px-3 pb-2 sm:gap-4 sm:px-4"
              : "overflow-hidden"
          }
        >
          <div
            className={`flex w-max flex-nowrap gap-3 px-3 sm:gap-4 sm:px-4 ${
              reduceMotion ? "" : "gallery-marquee-track"
            }`}
          >
            {strip.map((img, i) => {
              const realIndex = i % images.length;
              return (
                <GalleryTile
                  key={`${img.src}-${i}`}
                  img={img}
                  onClick={() => open(realIndex)}
                  className="aspect-[5/4] w-[min(72vw,280px)] shrink-0 sm:w-[300px] lg:w-[360px]"
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {index != null ? (
          <GalleryLightbox
            images={images}
            index={index}
            direction={direction}
            onClose={close}
            onPrev={prev}
            onNext={next}
            onGoTo={goTo}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MasonryGallery({
  images,
  showFilters,
}: {
  images: readonly GalleryImage[];
  showFilters: boolean;
}) {
  const [filter, setFilter] = useState<GalleryFilterId>("all");
  const filtered = useMemo(
    () => filterImages(images, filter),
    [images, filter],
  );
  const counts = useMemo(() => {
    const c: Record<GalleryFilterId, number> = {
      all: images.length,
      water: 0,
      beach: 0,
      scenic: 0,
    };
    for (const img of images) {
      if (img.tag) c[img.tag] += 1;
    }
    return c;
  }, [images]);

  const { index, direction, open, close, prev, next, goTo } =
    useGalleryLightbox(filtered);

  useEffect(() => {
    if (index != null && index >= filtered.length) close();
  }, [filtered.length, index, close]);

  return (
    <>
      {showFilters ? (
        <GalleryFilters active={filter} counts={counts} onChange={setFilter} />
      ) : null}

      <motion.ul
        layout
        className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-3 lg:auto-rows-[280px] lg:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.li
              key={img.src}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className={`list-none ${MASONRY_SPANS[i % MASONRY_SPANS.length] ?? ""}`}
            >
              <GalleryTile
                img={img}
                onClick={() => open(i)}
                eager={i < 4}
                className="h-full min-h-[200px] w-full"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm font-semibold text-slate-500">
          No photos in this category yet.
        </p>
      ) : null}

      <AnimatePresence>
        {index != null ? (
          <GalleryLightbox
            images={filtered}
            index={index}
            direction={direction}
            onClose={close}
            onPrev={prev}
            onNext={next}
            onGoTo={goTo}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function GallerySection({
  variant = "marquee",
  showHeading = true,
  showViewAll = false,
  showFilters,
  compact = false,
  className = "",
  id = "gallery",
  images = galleryImages,
}: GallerySectionProps) {
  const padY = compact ? sectionYCompact : sectionY;
  const filtersOn = showFilters ?? variant === "masonry";

  return (
    <section
      id={id}
      className={`relative overflow-x-clip bg-white ${className}`}
    >
      {variant === "masonry" ? (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(18, 167, 255, 0.12), transparent)",
          }}
        />
      ) : null}

      <div className={`mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8 ${padY}`}>
        {showHeading ? (
          <RevealSection as="div" delayMs={0}>
            <SectionHeading
              eyebrow="GALLERY"
              title={
                variant === "masonry"
                  ? "Life on the water in Bimini"
                  : "Moments from Bimini"
              }
              subtitle={
                variant === "masonry"
                  ? "Filter by mood, tap to enlarge, and swipe through the full collection."
                  : "Hover to pause · tap any photo to explore in full screen."
              }
            />
            {showViewAll ? (
              <motion.div
                className="mt-6 flex justify-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <AnimatedAnchor
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[color:var(--brand-primary)] bg-transparent px-7 py-3 text-sm font-extrabold text-[color:var(--brand-primary)] shadow-sm transition hover:bg-[color:var(--brand-primary)] hover:text-white hover:shadow-md"
                >
                  View full gallery
                </AnimatedAnchor>
              </motion.div>
            ) : null}
          </RevealSection>
        ) : null}

        <div className={showHeading ? sectionContentGap : ""}>
          {variant === "marquee" ? (
            <MarqueeGallery images={images} />
          ) : (
            <MasonryGallery images={images} showFilters={filtersOn} />
          )}
        </div>
      </div>

      {variant === "masonry" ? (
        <RevealSection className="pb-6 pt-2 sm:pb-8" delayMs={120}>
          <p className="px-4 text-center text-sm text-slate-600 sm:px-6">
            Planning your trip?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[color:var(--brand-primary)] hover:underline"
            >
              Get in touch
            </Link>{" "}
            to book your adventure.
          </p>
        </RevealSection>
      ) : null}
    </section>
  );
}
