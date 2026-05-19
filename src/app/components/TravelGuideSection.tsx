"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  destinationHighlights,
  entryRequirements,
  gettingToBimini,
  type TravelGuideBlock,
} from "../data/travel-guide";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { RevealSection } from "./RevealSection";

type TravelGuideSectionProps = {
  showDestinations?: boolean;
};

type TabId = "travel" | "entry";

const tabs: { id: TabId; label: string; hint: string }[] = [
  { id: "travel", label: "Getting here", hint: "Ferry, flights & boats" },
  { id: "entry", label: "Passport & entry", hint: "Bahamas requirements" },
];

function GuideIcon({ type }: { type: TravelGuideBlock["icon"] }) {
  const className = "h-5 w-5 text-[color:var(--brand-primary)]";
  switch (type) {
    case "ferry":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18M5 14l2-8h10l2 8M7 14v4m10-4v4" />
        </svg>
      );
    case "plane":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case "boat":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l1.5-4.5h15L21 17M7 17l2-8h6l2 8" />
        </svg>
      );
    case "passport":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "globe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      );
    case "customs":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function GuideAccordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly TravelGuideBlock[];
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const reducedMotion = useReducedMotion();

  return (
    <motion.ul
      className="space-y-2"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {items.map((block, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.li key={block.title} variants={fadeUp}>
            <motion.div
              className={`overflow-hidden rounded-xl ring-1 transition-shadow duration-300 ${
                isOpen
                  ? "bg-white shadow-md shadow-[color:var(--brand-primary)]/10 ring-[color:var(--brand-primary)]/25"
                  : "bg-white/80 ring-slate-200/90 hover:shadow-sm hover:ring-slate-300"
              }`}
              layout={!reducedMotion}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
                aria-expanded={isOpen}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isOpen
                      ? "bg-[color:var(--brand-primary)]/10"
                      : "bg-slate-100"
                  }`}
                >
                  <GuideIcon type={block.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold text-slate-900">
                    {block.title}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-slate-400"
                  aria-hidden
                >
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="body"
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5">
                      {block.body}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export function TravelGuideSection({
  showDestinations = false,
}: TravelGuideSectionProps) {
  const [tab, setTab] = useState<TabId>("travel");
  const [activeDestination, setActiveDestination] = useState(0);
  const reducedMotion = useReducedMotion();

  const tabItems = tab === "travel" ? gettingToBimini : entryRequirements;

  return (
    <RevealSection
      id="plan-your-trip"
      className="relative scroll-mt-24 overflow-hidden py-12 sm:py-14 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-50/80"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[color:var(--brand-ocean)]/10 blur-3xl"
        aria-hidden
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="mx-auto max-w-3xl px-6 text-center lg:max-w-4xl lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-extrabold uppercase tracking-widest text-[color:var(--brand-primary)]"
        >
          Plan your trip
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-2 text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary-2)] sm:text-3xl"
        >
          Getting here &amp; what to bring
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-sm text-slate-600 sm:text-base">
          Florida travelers ask these first—tap a topic to expand details.
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto mt-8 max-w-2xl px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <motion.div
          className="flex rounded-full bg-slate-100/90 p-1 ring-1 ring-slate-200/80"
          role="tablist"
          aria-label="Travel planning topics"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex-1 rounded-full px-3 py-2.5 text-center transition sm:px-4 ${
                tab === t.id ? "text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === t.id ? (
                <motion.span
                  layoutId="travel-guide-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[color:var(--brand-primary)] to-[color:var(--brand-ocean)] shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10 block text-xs font-extrabold sm:text-sm">
                {t.label}
              </span>
              <span
                className={`relative z-10 mt-0.5 hidden text-[10px] font-medium sm:block ${
                  tab === t.id ? "text-white/85" : "text-slate-500"
                }`}
              >
                {t.hint}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="mt-5 rounded-2xl bg-white/60 p-3 ring-1 ring-slate-200/80 backdrop-blur-sm sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <GuideAccordion items={tabItems} defaultOpen={0} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {showDestinations ? (
        <motion.div
          className="mx-auto mt-14 max-w-6xl px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center">
            <h3 className="text-xl font-extrabold text-[color:var(--brand-primary-2)] sm:text-2xl">
              Explore Bimini with us
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Tap an area—our tours cover these zones; no separate booking per stop.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4"
          >
            {destinationHighlights.map((d, i) => {
              const isActive = activeDestination === i;
              return (
                <motion.button
                  key={d.slug}
                  type="button"
                  id={d.slug}
                  onClick={() => setActiveDestination(i)}
                  className={`group relative min-w-[200px] shrink-0 scroll-mt-28 overflow-hidden rounded-2xl p-5 text-left ring-1 transition sm:min-w-0 ${
                    isActive
                      ? "bg-white shadow-lg ring-[color:var(--brand-primary)]/30"
                      : "bg-white/90 ring-slate-200/90 hover:shadow-md hover:ring-slate-300"
                  }`}
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${d.accent}`}
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                  />
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-extrabold text-white ${d.accent}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-extrabold text-slate-900">{d.title}</p>
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.p
                        key="body"
                        initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-sm leading-relaxed text-slate-600"
                      >
                        {d.body}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="teaser"
                        initial={false}
                        className="mt-2 line-clamp-2 text-xs text-slate-500"
                      >
                        {d.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-center text-sm text-slate-600"
          >
            Ready to go?{" "}
            <Link
              href="/#tours"
              className="font-semibold text-[color:var(--brand-primary)] hover:underline"
            >
              Browse tours
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-semibold text-[color:var(--brand-primary)] hover:underline"
            >
              contact us
            </Link>
            .
          </motion.p>
        </motion.div>
      ) : null}
    </RevealSection>
  );
}
