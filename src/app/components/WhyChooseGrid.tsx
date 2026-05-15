"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

type Card = { readonly title: string; readonly body: string };

export function WhyChooseGrid({ items }: { items: readonly Card[] }) {
  return (
    <motion.div
      className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {items.map((card, index) => (
        <motion.article
          key={card.title}
          variants={fadeUp}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50/80 p-6 text-center shadow-sm ring-1 ring-slate-200/80 transition-shadow duration-300 hover:shadow-xl hover:ring-[color:var(--brand-primary)]/20 sm:p-7"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--brand-accent)]/20 text-sm font-extrabold text-[color:var(--brand-primary-2)] ring-1 ring-[color:var(--brand-accent)]/40">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-4 text-balance text-base font-extrabold text-[color:var(--brand-primary)] sm:text-lg">
            {card.title}
          </h3>
          <motion.div
            className="mx-auto my-4 h-px w-12 bg-gradient-to-r from-transparent via-[color:var(--brand-primary)]/30 to-transparent"
            aria-hidden
          />
          <p className="flex-1 text-pretty text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {card.body}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
