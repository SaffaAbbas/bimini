"use client";

import { useCallback, useState } from "react";

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
    <ul className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
      {items.map((item, index) => {
        const isOpen = expanded === index;
        return (
          <li key={item.title} className="list-none">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/90 transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl motion-safe:hover:ring-[color:var(--brand-primary)]/25 md:motion-safe:hover:-translate-y-1.5">
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-balance font-serif text-lg font-bold tracking-tight text-white drop-shadow sm:text-xl">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p
                  className={`text-pretty text-sm leading-relaxed text-slate-600 sm:text-base md:line-clamp-none ${
                    isOpen ? "" : "line-clamp-4 md:line-clamp-none"
                  }`}
                >
                  {item.body}
                </p>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[color:var(--brand-primary)] transition hover:bg-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)] md:hidden"
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Show less" : "Read more"}
                  <span className="text-[10px] motion-safe:transition-transform motion-safe:duration-200" aria-hidden>
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
