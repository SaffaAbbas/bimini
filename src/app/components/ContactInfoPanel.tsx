"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "../data/business-info";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const channels = [
  {
    label: "Email",
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18V8H3v8z"
      />
    ),
  },
  {
    label: "WhatsApp",
    value: BUSINESS.whatsappDisplay,
    href: `https://wa.me/${BUSINESS.whatsapp}`,
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h8M8 14h4m-4 6l1.5-3.5A9 9 0 1112 3a9 9 0 019 17.5L8 20z"
      />
    ),
  },
  {
    label: "Phone",
    value: BUSINESS.phoneDisplay,
    href: `tel:${BUSINESS.phoneTel}`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.57 2.29a2 2 0 01-.45 1.86l-1.27 1.27a16 16 0 006.36 6.36l1.27-1.27a2 2 0 011.86-.45l2.29.57A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
  },
  {
    label: "Website",
    value: "toursbimini.com",
    href: "https://www.toursbimini.com",
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    ),
  },
] as const;

export function ContactInfoPanel() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="space-y-5"
    >
      {channels.map((ch) => (
        <motion.a
          key={ch.label}
          href={ch.href}
          aria-label={`${ch.label}: ${ch.value}`}
          variants={fadeUp}
          target={"external" in ch && ch.external ? "_blank" : undefined}
          rel={"external" in ch && ch.external ? "noopener noreferrer" : undefined}
          className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/90 transition-shadow duration-300 hover:shadow-lg hover:ring-[color:var(--brand-primary)]/25"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--brand-primary)]/10 to-[color:var(--brand-ocean)]/15 ring-1 ring-[color:var(--brand-primary)]/15 transition group-hover:from-[color:var(--brand-primary)]/15 group-hover:to-[color:var(--brand-ocean)]/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[color:var(--brand-primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {ch.icon}
            </svg>
          </div>
          <motion.div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wide text-[color:var(--brand-primary)]">
              {ch.label}
            </span>
            <span className="break-words text-base font-semibold leading-snug text-slate-900 group-hover:text-[color:var(--brand-primary)]">
              {ch.value}
            </span>
          </motion.div>
        </motion.a>
      ))}

      <motion.div
        variants={fadeUp}
        className="rounded-2xl bg-gradient-to-br from-[color:var(--brand-deep)] to-[color:var(--brand-primary-2)] p-6 text-white shadow-lg"
      >
        <p className="text-xs font-extrabold uppercase tracking-widest text-[color:var(--brand-accent)]">
          Response time
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/90">
          We typically reply within a few hours during island business hours.
          For same-day trips, call or text — we&apos;re happy to help.
        </p>
      </motion.div>
    </motion.div>
  );
}
