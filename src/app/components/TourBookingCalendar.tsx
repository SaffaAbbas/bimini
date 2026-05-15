"use client";

import Link from "next/link";
import { btnAccentDisabled, btnAccentFullWidth } from "./button-styles";
import { useMemo, useState } from "react";
import { BOOKING_FOOTNOTE } from "../data/tour-packages";

const TIME_OPTIONS = [
  { value: "09:00", label: "9:00 AM — Available" },
  { value: "11:00", label: "11:00 AM — Available" },
  { value: "13:00", label: "1:00 PM — Available" },
  { value: "15:00", label: "3:00 PM — Available" },
] as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalYMD(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function weekdayOfFirst(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

type Props = {
  tourSlug: string;
  priceLines: readonly string[];
};

export function TourBookingCalendar({ tourSlug, priceLines }: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [selected, setSelected] = useState<Date | null>(null);
  const [guests, setGuests] = useState("2");
  const [time, setTime] = useState<string>(TIME_OPTIONS[0].value);

  const dim = daysInMonth(view.y, view.m);
  const lead = weekdayOfFirst(view.y, view.m);
  const cells = useMemo(() => {
    const out: (number | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= dim; d++) out.push(d);
    return out;
  }, [dim, lead]);

  const monthLabel = new Date(view.y, view.m, 1).toLocaleString("en", {
    month: "long",
    year: "numeric",
  });

  function cellDate(day: number): Date {
    return new Date(view.y, view.m, day);
  }

  function isDisabled(day: number): boolean {
    return startOfDay(cellDate(day)) < today;
  }

  function isSelected(day: number): boolean {
    if (!selected) return false;
    return (
      selected.getFullYear() === view.y &&
      selected.getMonth() === view.m &&
      selected.getDate() === day
    );
  }

  function prevMonth() {
    setView((v) => {
      const d = new Date(v.y, v.m - 1, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  function nextMonth() {
    setView((v) => {
      const d = new Date(v.y, v.m + 1, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  const checkoutHref = useMemo(() => {
    if (!selected) return "#";
    const q = new URLSearchParams();
    q.set("date", toLocalYMD(selected));
    q.set("guests", guests);
    q.set("time", time);
    return `/tours/${tourSlug}/checkout?${q.toString()}`;
  }, [tourSlug, selected, guests, time]);

  const priceSummary =
    priceLines.length === 1
      ? priceLines[0]
      : priceLines.slice(0, 2).join(" · ");

  const selectClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[color:var(--brand-primary)] focus:ring-1 focus:ring-[color:var(--brand-primary)]/25 sm:text-sm";

  return (
    <div
      id="tour-book-calendar"
      className="flex h-full min-h-0 w-full flex-col justify-center scroll-mt-24 rounded-xl border-0 bg-transparent p-6 shadow-none sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-base font-bold tracking-tight text-slate-900">Book</h2>
          <p className="mt-0.5 text-[11px] leading-snug text-slate-600 sm:text-xs">
            Date, guests &amp; time — we confirm after your message.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Guests
          </label>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className={selectClass}>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tour-time" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Time <span className="text-red-500">*</span>
          </label>
          <select id="tour-time" value={time} onChange={(e) => setTime(e.target.value)} className={selectClass}>
            {TIME_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95 motion-safe:duration-150"
            aria-label="Previous month"
          >
            ←
          </button>
          <p className="text-center text-xs font-bold text-slate-900 sm:text-sm">{monthLabel}</p>
          <button
            type="button"
            onClick={nextMonth}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95 motion-safe:duration-150"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="mt-2 grid grid-cols-7 gap-px text-center text-[9px] font-bold uppercase tracking-tight text-slate-400 sm:text-[10px]">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="py-0.5">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-0.5 grid grid-cols-7 gap-px">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`e-${i}`} className="h-9" aria-hidden />
            ) : (
              <button
                key={day}
                type="button"
                disabled={isDisabled(day)}
                onClick={() => setSelected(cellDate(day))}
                className={`mx-auto flex aspect-square max-h-9 w-full max-w-9 items-center justify-center rounded-md text-[11px] font-semibold outline-none transition active:scale-95 sm:text-xs motion-safe:duration-150 ${
                  isDisabled(day)
                    ? "cursor-not-allowed text-slate-300"
                    : isSelected(day)
                      ? "bg-[color:var(--brand-primary)] text-white shadow-sm ring-2 ring-[color:var(--brand-primary)]/35 ring-offset-1 ring-offset-white"
                      : "text-slate-800 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]/40"
                }`}
              >
                {day}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="text-[11px] font-semibold text-slate-600 sm:text-xs">Price (est.)</span>
        <span className="max-w-[65%] text-right text-[11px] font-bold leading-snug text-slate-900 sm:text-xs">
          {priceSummary}
        </span>
      </div>
      <p className="mt-1 text-[10px] font-medium leading-snug text-red-600 sm:text-[11px]">
        *Final total + taxes per pricing above.
      </p>

      {selected ? (
        <Link
          href={checkoutHref}
          className={`mt-3 ${btnAccentFullWidth} motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md active:translate-y-0`}
        >
          Book now
        </Link>
      ) : (
        <span className={`mt-3 ${btnAccentDisabled}`}>
          Book now
        </span>
      )}
      {!selected ? (
        <p className="mt-1.5 text-center text-[10px] text-slate-500 sm:text-xs">Pick a date to continue.</p>
      ) : null}

      <p className="mt-3 text-[10px] italic leading-relaxed text-slate-500 sm:text-xs">{BOOKING_FOOTNOTE}</p>
    </div>
  );
}
