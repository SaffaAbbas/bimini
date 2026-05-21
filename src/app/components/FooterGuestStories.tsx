"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  guestStories,
  testimonialInitials,
  testimonials,
  type Testimonial,
} from "../data/testimonials";
import { easeOut, tapScale } from "../lib/motion";

type TabId = "stories" | "testimonials";

const TABS: { id: TabId; label: string }[] = [
  { id: "stories", label: "Guest stories" },
  { id: "testimonials", label: "Testimonials" },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${
            i < count ? "text-[color:var(--brand-accent)]" : "text-slate-200"
          }`}
        >
          <path
            fill="currentColor"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
}

function StoryCard({ item, compact }: { item: Testimonial; compact?: boolean }) {
  return (
    <>
      <Stars count={item.rating ?? 5} />
      <p
        className={`mt-3 text-pretty leading-relaxed text-slate-700 ${
          compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
        }`}
      >
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand-primary)] to-[color:var(--brand-ocean)] text-xs font-extrabold text-white shadow-md ring-2 ring-white">
          {testimonialInitials(item.name)}
        </div>
        <div className="text-center sm:text-left">
          <p className="text-sm font-extrabold text-slate-900">{item.name}</p>
          <p className="text-xs text-slate-500">{item.location}</p>
          <p className="mt-0.5 text-xs font-semibold text-[color:var(--brand-primary)]">
            {item.tour}
          </p>
        </div>
      </div>
    </>
  );
}

export function FooterGuestStories() {
  const reducedMotion = useReducedMotion();
  const [tab, setTab] = useState<TabId>("stories");
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const items = tab === "stories" ? guestStories : testimonials;
  const count = items.length;
  const current = items[active] ?? items[0];

  useEffect(() => {
    setActive(0);
    setDirection(1);
  }, [tab]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active],
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
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [next, paused, reducedMotion, tab]);

  if (!current) return null;

  const slideX = direction > 0 ? 24 : -24;

  return (
    <motion.div
      className="mt-12 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-sky-50/80 p-5 ring-1 ring-slate-200/90 sm:p-6 lg:p-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: easeOut }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[color:var(--brand-primary)]">
            Guest voices
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Real reviews from Florida travelers who toured with us.
          </p>
        </div>
        <div
          className="flex justify-center rounded-full bg-slate-100/90 p-1 ring-1 ring-slate-200/80 sm:justify-end"
          role="tablist"
          aria-label="Guest stories or testimonials"
        >
          {TABS.map((t) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-4 py-2 text-xs font-extrabold transition sm:text-sm ${
                  selected ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="footer-guest-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[color:var(--brand-primary)] to-[color:var(--brand-ocean)] shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative mt-5 overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80 sm:p-6"
        role="region"
        aria-roledescription="carousel"
        aria-label={tab === "stories" ? "Guest stories" : "Testimonials"}
      >
        <div className="relative min-h-[10rem] sm:min-h-[9rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${tab}-${active}`}
              custom={direction}
              initial={{ opacity: 0, x: slideX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slideX }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="text-center"
            >
              <StoryCard item={current} compact={tab === "testimonials"} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          <motion.button
            type="button"
            onClick={prev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[color:var(--brand-primary)] ring-1 ring-slate-200/90 transition hover:bg-white hover:shadow-md"
            aria-label="Previous"
            whileTap={tapScale}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div className="flex gap-1.5" role="tablist" aria-label="Select review">
            {items.map((t, i) => (
              <button
                key={`${tab}-${t.name}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${t.name}`}
                aria-selected={i === active}
                className="rounded-full p-1"
              >
                <motion.span
                  className={`block h-1.5 rounded-full ${
                    i === active
                      ? "bg-[color:var(--brand-primary)]"
                      : "bg-slate-300"
                  }`}
                  animate={{ width: i === active ? 20 : 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={next}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[color:var(--brand-primary)] ring-1 ring-slate-200/90 transition hover:bg-white hover:shadow-md"
            aria-label="Next"
            whileTap={tapScale}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        <Link
          href="/#guest-stories"
          className="font-semibold text-[color:var(--brand-primary)] hover:underline"
        >
          Read more on the home page
        </Link>
        {" · "}
        <Link href="/gallery" className="font-semibold text-slate-600 hover:text-slate-900 hover:underline">
          Photo gallery
        </Link>
      </p>
    </motion.div>
  );
}
