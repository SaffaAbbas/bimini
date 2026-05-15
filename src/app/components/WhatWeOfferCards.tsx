"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export type OfferingCard = {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

type Props = {
  items: readonly OfferingCard[];
};

export function WhatWeOfferCards({ items }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  }, []);

  return (
    <motion.ul
      className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {items.map((item, index) => {
        const isOpen = expanded === index;
        return (
          <motion.li key={item.title} variants={fadeUp} className="list-none">
            <motion.article
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/90"
              whileHover={{
                y: -6,
                boxShadow: "0 24px 48px rgba(11, 86, 183, 0.12)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
                <motion.img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <h3 className="text-balance text-lg font-bold tracking-tight text-white drop-shadow sm:text-xl">
                    {item.title}
                  </h3>
                </motion.div>
              </motion.div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={isOpen ? "open" : "closed"}
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    className={`text-pretty text-sm leading-relaxed text-slate-600 sm:text-base md:line-clamp-none ${
                      isOpen ? "" : "line-clamp-4 md:line-clamp-none"
                    }`}
                  >
                    {item.body}
                  </motion.p>
                </AnimatePresence>
                <motion.button
                  type="button"
                  onClick={() => toggle(index)}
                  className="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[color:var(--brand-primary)] transition hover:bg-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)] md:hidden"
                  aria-expanded={isOpen}
                  whileTap={{ scale: 0.97 }}
                >
                  {isOpen ? "Show less" : "Read more"}
                  <motion.span
                    className="text-[10px]"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    aria-hidden
                  >
                    ▼
                  </motion.span>
                </motion.button>
              </div>
            </motion.article>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
