"use client";

import { useCallback, useMemo, useState } from "react";
import { BOOKING_FOOTNOTE, type TourPackage } from "../data/tour-packages";

type Props = {
  tour: TourPackage;
};

function uniqueImages(tour: TourPackage, max: number) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const src of [tour.imageSrc, ...(tour.gallery ?? [])]) {
    if (!seen.has(src)) {
      seen.add(src);
      out.push(src);
      if (out.length >= max) break;
    }
  }
  return out;
}

export function TourBookingMedia({ tour }: Props) {
  const shots = useMemo(() => uniqueImages(tour, 5), [tour]);
  const [active, setActive] = useState(0);
  const safe = Math.min(active, Math.max(0, shots.length - 1));

  const go = useCallback(
    (i: number) => {
      setActive(Math.max(0, Math.min(i, shots.length - 1)));
    },
    [shots.length]
  );

  const previewHighlights = tour.experienceHighlights.slice(0, 4);

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 p-6 sm:p-8 lg:h-full lg:min-h-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">On this tour</p>
          <h2 className="mt-1 font-serif text-lg font-bold text-slate-900 sm:text-xl">A glimpse of your day</h2>
        </div>
        <a
          href="#tour-book-calendar"
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[color:var(--brand-primary)] shadow-sm transition hover:border-[color:var(--brand-primary)]/40 hover:shadow motion-safe:hover:-translate-y-0.5"
        >
          Book ↓
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold text-sky-900 ring-1 ring-sky-200/80">
          {tour.duration}
        </span>
        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-950 ring-1 ring-amber-200/80">
          {tour.category}
        </span>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-900 ring-1 ring-emerald-200/80">
          {tour.locationLabel}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200/80">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
          {shots.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover duration-500 ease-out motion-safe:transition-opacity motion-safe:transition-transform ${
                i === safe ? "z-10 opacity-100" : "z-0 opacity-0 motion-safe:scale-[1.03]"
              }`}
              sizes="(min-width: 1024px) 35vw, 100vw"
              aria-hidden={i !== safe}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            aria-hidden
          />
          <p className="pointer-events-none absolute bottom-3 left-3 right-3 z-30 text-xs font-semibold text-white drop-shadow sm:text-sm">
            {shots.length > 1
              ? `${tour.title} · Photo ${safe + 1} of ${shots.length}`
              : tour.imageAlt}
          </p>
        </div>
      </div>

      {shots.length > 1 ? (
        <div className="flex flex-wrap gap-2 sm:gap-2.5" role="tablist" aria-label="Tour photos">
          {shots.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              role="tab"
              aria-label={`Show photo ${i + 1}`}
              aria-selected={i === safe}
              onClick={() => go(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-all motion-safe:duration-200 sm:h-16 sm:w-24 ${
                i === safe
                  ? "z-10 ring-[color:var(--brand-primary)] shadow-md motion-safe:scale-105"
                  : "ring-transparent opacity-80 hover:opacity-100 hover:ring-slate-300 motion-safe:hover:scale-[1.02]"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      ) : null}

      <div className="space-y-2">
        <details className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 shadow-sm open:bg-white open:shadow-md motion-safe:transition-shadow">
          <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              <span>Meet-up &amp; departure</span>
              <span className="text-[color:var(--brand-primary)]" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <p className="mt-2 border-t border-slate-100 pt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {tour.meetingPoint}
          </p>
        </details>

        <details className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 shadow-sm open:bg-white open:shadow-md motion-safe:transition-shadow">
          <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              <span>Trip highlights</span>
              <span className="text-[color:var(--brand-primary)]" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <ul className="mt-2 space-y-2 border-t border-slate-100 pt-2">
            {previewHighlights.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-xs leading-snug text-slate-600 motion-safe:transition-transform motion-safe:duration-200 sm:text-sm motion-safe:hover:translate-x-0.5"
              >
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-primary)]/15 text-[10px] font-bold text-[color:var(--brand-primary)]">
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </details>

        <details className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 shadow-sm open:bg-white open:shadow-md motion-safe:transition-shadow">
          <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              <span>Booking &amp; refunds</span>
              <span className="text-[color:var(--brand-primary)]" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <p className="mt-2 border-t border-slate-100 pt-2 text-xs italic leading-relaxed text-slate-600 sm:text-sm">
            {BOOKING_FOOTNOTE}
          </p>
        </details>
      </div>
    </div>
  );
}
