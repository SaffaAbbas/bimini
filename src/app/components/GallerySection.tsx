"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { galleryImages, type GalleryImage } from "../data/gallery-images";
import {
  sectionContentGap,
  sectionY,
  sectionYCompact,
} from "../lib/section-spacing";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "../lib/motion";
import { AnimatedAnchor } from "./AnimatedButton";
import { RevealSection } from "./RevealSection";
import { SectionHeading } from "./SectionHeading";

type GallerySectionProps = {
  variant?: "marquee" | "masonry";
  showHeading?: boolean;
  showViewAll?: boolean;
  /** Tighter padding when gallery follows another section (e.g. contact page). */
  compact?: boolean;
  className?: string;
  id?: string;
  images?: readonly GalleryImage[];
};

function GalleryLightbox({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="Image preview"
    >
      <motion.button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
        aria-label="Close preview"
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
      <motion.figure
        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] w-auto max-w-full object-contain"
        />
        {image.caption ? (
          <figcaption className="bg-[color:var(--brand-deep)] px-5 py-3 text-center text-sm font-medium text-white/95">
            {image.caption}
          </figcaption>
        ) : null}
      </motion.figure>
    </motion.div>
  );
}

function MarqueeGallery({ images }: { images: readonly GalleryImage[] }) {
  const loop = [...images, ...images];

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24"
        aria-hidden
      />

      <motion.div
        className="flex gap-3 px-3 sm:gap-4 sm:px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 32,
          ease: "linear",
        }}
      >
        {loop.map((img, i) => (
          <motion.div
            key={`${img.src}-${i}`}
            className="group relative aspect-[4/3] w-[260px] shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:w-[300px] lg:w-[340px]"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-deep)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function MasonryGallery({ images }: { images: readonly GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);
  const close = useCallback(() => setActive(null), []);

  const spans = [
    "sm:row-span-2",
    "",
    "sm:col-span-2",
    "",
    "sm:row-span-2",
    "",
    "",
    "sm:col-span-2 sm:row-span-2",
    "",
    "",
    "sm:row-span-2",
    "",
  ];

  return (
    <>
      <motion.ul
        className="grid auto-rows-[200px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:auto-rows-[220px] lg:gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {images.map((img, i) => (
          <motion.li
            key={img.src}
            variants={scaleIn}
            className={`list-none ${spans[i % spans.length] ?? ""}`}
          >
            <motion.button
              type="button"
              onClick={() => setActive(img)}
              className="group relative h-full min-h-[200px] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-white drop-shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.alt}
              </span>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm ring-1 ring-white/30 transition-opacity duration-300 group-hover:opacity-100">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </span>
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {active ? <GalleryLightbox image={active} onClose={close} /> : null}
      </AnimatePresence>
    </>
  );
}

export function GallerySection({
  variant = "marquee",
  showHeading = true,
  showViewAll = false,
  compact = false,
  className = "",
  id = "gallery",
  images = galleryImages,
}: GallerySectionProps) {
  const padY = compact ? sectionYCompact : sectionY;

  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-white ${className}`}
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

      <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${padY}`}>
        {showHeading ? (
          <RevealSection as="motion.div" delayMs={0}>
            <SectionHeading
              eyebrow="GALLERY"
              title={
                variant === "masonry"
                  ? "Life on the water in Bimini"
                  : "Moments from Bimini"
              }
              subtitle={
                variant === "masonry"
                  ? "Tap any photo to view it full size — every image is from our island tours and adventures."
                  : "A glimpse of turquoise water, island culture, and unforgettable days at sea."
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

        <motion.div className={showHeading ? sectionContentGap : ""}>
          {variant === "marquee" ? (
            <MarqueeGallery images={images} />
          ) : (
            <MasonryGallery images={images} />
          )}
        </motion.div>
      </div>

      {variant === "marquee" && showViewAll ? null : variant === "masonry" ? (
        <RevealSection className="pb-4 pt-2" delayMs={120}>
          <p className="text-center text-sm text-slate-600">
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
