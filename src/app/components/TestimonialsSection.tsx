"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  testimonialInitials,
  testimonials,
} from "../data/testimonials";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { ReviewBadges } from "./ReviewBadges";

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <motion.div
      className="flex justify-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            i < count ? "text-[color:var(--brand-accent)]" : "text-slate-200"
          }`}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

export function TestimonialsSection() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;
  const current = testimonials[active];

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active, count],
  );

  const next = useCallback(() => {
    setDirection(1);
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [next, paused, reducedMotion]);

  return (
    <section
      id="guest-stories"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white py-12 sm:py-14"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="pointer-events-none absolute -left-24 top-8 h-48 w-48 rounded-full bg-[color:var(--brand-ocean)]/10 blur-3xl"
        aria-hidden
        animate={reducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-[color:var(--brand-accent)]/15 blur-3xl"
        aria-hidden
        animate={reducedMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative mx-auto max-w-3xl px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[color:var(--brand-primary)]">
            Guest stories
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary-2)] sm:text-3xl"
          >
            What travelers say
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative mt-8"
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest testimonials"
        >
          <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 sm:p-8">
            <StarRow count={current.rating ?? 5} />

            <div className="relative mt-5 min-h-[7.5rem] sm:min-h-[6.5rem]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <p className="text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.footer
                key={`author-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-6 flex flex-col items-center gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-center sm:gap-4"
              >
                <motion.div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand-primary)] to-[color:var(--brand-ocean)] text-sm font-extrabold text-white shadow-md ring-2 ring-white"
                  whileHover={{ scale: 1.06 }}
                >
                  {testimonialInitials(current.name)}
                </motion.div>
                <motion.div className="text-center sm:text-left">
                  <p className="text-sm font-extrabold text-slate-900">
                    {current.name}
                  </p>
                  <p className="text-xs text-slate-500">{current.location}</p>
                  <p className="mt-0.5 text-xs font-semibold text-[color:var(--brand-primary)]">
                    {current.tour}
                  </p>
                </motion.div>
              </motion.footer>
            </AnimatePresence>
          </div>

          <motion.div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[color:var(--brand-primary)] shadow-md ring-1 ring-slate-200/90 transition hover:bg-slate-50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]"
              aria-label="Previous review"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.div className="flex gap-2" role="tablist" aria-label="Choose review">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Review ${i + 1} from ${t.name}`}
                  onClick={() => goTo(i)}
                  className="rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]"
                >
                  <motion.span
                    className={`block h-2 rounded-full ${
                      i === active
                        ? "bg-[color:var(--brand-primary)]"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    animate={{ width: i === active ? 24 : 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                </button>
              ))}
            </motion.div>

            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[color:var(--brand-primary)] shadow-md ring-1 ring-slate-200/90 transition hover:bg-slate-50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]"
              aria-label="Next review"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        <ReviewBadges className="mt-6" />
      </motion.div>
    </section>
  );
}
