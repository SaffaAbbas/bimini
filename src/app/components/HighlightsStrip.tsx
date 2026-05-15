"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

type Highlight = { readonly value: string; readonly label: string };

const icons = [
  // Bahamas / Out Islands
  (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  // Distance from Miami
  (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  ),
  // Two islands
  (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  ),
  // Local Bahamian guides
  (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  ),
] as const;

function WaveTop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-px text-white" aria-hidden>
      <svg viewBox="0 0 1440 48" className="h-8 w-full sm:h-10" preserveAspectRatio="none">
        <path
          d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function WaveBottom() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-px text-white" aria-hidden>
      <svg viewBox="0 0 1440 48" className="h-8 w-full sm:h-10" preserveAspectRatio="none">
        <path
          d="M0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,48 L0,48 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function HighlightsStrip({ items }: { items: readonly Highlight[] }) {
  return (
    <section className="relative overflow-hidden">
      <WaveTop />

      <div className="relative bg-gradient-to-b from-white via-sky-50/90 to-[#e8f6fc] pb-6 pt-10 sm:pb-8 sm:pt-12">
        <motion.div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(18, 167, 255, 0.14), transparent 55%), radial-gradient(ellipse 40% 30% at 90% 80%, rgba(245, 196, 0, 0.1), transparent 50%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(11, 86, 183, 0.06), transparent 50%)",
          }}
        />

        <motion.div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45 }}
          >
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-accent)]" aria-hidden />
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-primary)]">
              Bimini, Bahamas
            </span>
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-ocean)]" aria-hidden />
          </motion.div>

          <motion.h2
            className="text-balance text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary-2)] sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            The closest slice of the{" "}
            <span className="text-[color:var(--brand-primary)]">Bahamas</span> to
            home
          </motion.h2>

          <motion.div
            className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--brand-accent)] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.12 }}
            aria-hidden
          />

          <motion.p
            className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Turquoise cays, Bahamian culture, and world-famous fishing—just 50
            miles off the Florida coast in the western Out Islands.
          </motion.p>
        </motion.div>

        <motion.ul
          className="relative mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 px-6 sm:mt-12 sm:grid-cols-4 sm:gap-5 lg:px-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {items.map((item, index) => (
            <motion.li key={item.label} variants={fadeUp} className="list-none">
              <motion.div
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/90 bg-white/95 px-4 py-7 text-center shadow-[0_8px_30px_rgba(11,86,183,0.08)] backdrop-blur-sm sm:px-5 sm:py-8"
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 48px rgba(11, 86, 183, 0.12)",
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[color:var(--brand-ocean)]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                  aria-hidden
                />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-[color:var(--brand-primary)]/10 ring-1 ring-sky-200/60 transition duration-300 group-hover:from-[color:var(--brand-primary)]/15 group-hover:to-[color:var(--brand-ocean)]/15 group-hover:ring-[color:var(--brand-primary)]/25">
                  <svg
                    className="h-6 w-6 text-[color:var(--brand-primary)] transition duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden
                  >
                    {icons[index % icons.length]}
                  </svg>
                </div>

                <p className="mt-4 text-2xl font-extrabold tracking-tight text-[color:var(--brand-primary)] sm:text-3xl">
                  {item.value}
                </p>

                <div
                  className="my-3 h-px w-8 bg-gradient-to-r from-transparent via-[color:var(--brand-accent)]/80 to-transparent"
                  aria-hidden
                />

                <p className="text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.14em] text-slate-600 sm:text-xs">
                  {item.label}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <WaveBottom />
    </section>
  );
}
