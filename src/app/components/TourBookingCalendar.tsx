"use client";

import Link from "next/link";
import { btnAccentDisabled, btnAccentFullWidth } from "./button-styles";
import { useMemo, useState } from "react";
import { BOOKING_FOOTNOTE } from "../data/tour-packages";
import { BookingInquiryNotice } from "./BookingInquiryNotice";
import {
  buildCheckoutSearchParams,
  calculateBookingTotal,
  getParticipantTierFields,
  totalParticipants,
  type ParticipantCounts,
} from "../lib/tour-participant-pricing";
import { formatMoneyUsd } from "../lib/tour-checkout-utils";

const TIME_OPTIONS = [
  { value: "09:00", label: "9:00 AM — Available" },
  { value: "11:00", label: "11:00 AM — Available" },
  { value: "13:00", label: "1:00 PM — Available" },
  { value: "15:00", label: "3:00 PM — Available" },
] as const;

const QTY_OPTIONS = Array.from({ length: 17 }, (_, i) => i);

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
  const tierFields = useMemo(
    () => getParticipantTierFields(tourSlug, priceLines),
    [tourSlug, priceLines],
  );

  const [view, setView] = useState(() => {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [selected, setSelected] = useState<Date | null>(null);
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [time, setTime] = useState<string>(TIME_OPTIONS[0].value);

  const participants: ParticipantCounts = useMemo(
    () => ({
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
    }),
    [adults, children, infants],
  );

  const bookingTotal = useMemo(
    () => calculateBookingTotal(tourSlug, priceLines, participants),
    [tourSlug, priceLines, participants],
  );

  const participantTotal = totalParticipants(participants);
  const canContinue =
    selected != null && participantTotal >= 1 && bookingTotal != null;

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

  const checkoutHref =
    selected && canContinue
      ? buildCheckoutSearchParams(tourSlug, toLocalYMD(selected), time, participants)
      : "#";

  const selectClass =
    "mt-2 w-full min-h-[44px] rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 shadow-sm outline-none focus:border-[color:var(--brand-primary)] focus:ring-2 focus:ring-[color:var(--brand-primary)]/25 touch-manipulation";

  function renderParticipantRow(
    id: string,
    title: string,
    price: string,
    value: string,
    onChange: (v: string) => void,
  ) {
    return (
      <div key={id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
        <div className="flex items-start justify-between gap-3">
          <label htmlFor={id} className="text-sm font-bold text-slate-900">
            {title} <span className="text-red-500" aria-hidden>*</span>
          </label>
          <span className="shrink-0 text-sm font-semibold text-slate-700">{price}</span>
        </div>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
          {QTY_OPTIONS.map((n) => (
            <option key={n} value={String(n)}>
              {n}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div
      id="tour-book-calendar"
      className="flex w-full flex-col scroll-mt-24 bg-white p-4 sm:p-6 lg:p-8"
    >
      <h2 className="font-serif text-xl font-bold text-slate-900">Booking calendar</h2>

      {/* 1. Participants — always Adult / Child / Infant like reference site */}
      <section className="mt-6">
        <h3 className="text-base font-bold text-slate-900">
          Enter number of participants <span className="text-red-500">*</span>
        </h3>

        {tierFields ? (
          <div className="mt-4 space-y-4">
            {renderParticipantRow(
              "participants-adult",
              tierFields.adultLabel,
              tierFields.adultPriceLabel,
              adults,
              setAdults,
            )}
            {renderParticipantRow(
              "participants-child",
              tierFields.childLabel,
              tierFields.childPriceLabel,
              children,
              setChildren,
            )}
            {renderParticipantRow(
              "participants-infant",
              tierFields.infantLabel,
              tierFields.infantPriceLabel,
              infants,
              setInfants,
            )}
          </div>
        ) : (
          <p className="mt-3 text-sm text-amber-900">
            Contact us for pricing on this package.
          </p>
        )}

        {participantTotal >= 1 && bookingTotal == null ? (
          <p className="mt-3 text-sm font-semibold text-red-600" role="alert">
            This group size cannot be booked online. Please contact us.
          </p>
        ) : null}
      </section>

      {/* 2. Date */}
      <section className="mt-8">
        <h3 className="text-base font-bold text-slate-900">
          Choose a date <span className="text-red-500">*</span>
        </h3>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            aria-label="Previous month"
          >
            ←
          </button>
          <p className="text-sm font-bold text-slate-900">{monthLabel}</p>
          <button
            type="button"
            onClick={nextMonth}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="mt-2 grid grid-cols-7 gap-px text-center text-[11px] font-bold text-slate-500">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`e-${i}`} className="aspect-square" aria-hidden />
            ) : (
              <button
                key={day}
                type="button"
                disabled={isDisabled(day)}
                onClick={() => setSelected(cellDate(day))}
                className={`flex aspect-square items-center justify-center rounded text-sm font-semibold transition ${
                  isDisabled(day)
                    ? "cursor-not-allowed text-slate-300"
                    : isSelected(day)
                      ? "bg-[color:var(--brand-primary)] text-white shadow"
                      : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                {day}
              </button>
            ),
          )}
        </div>
      </section>

      {/* 3. Time */}
      <section className="mt-8">
        <label htmlFor="tour-time" className="text-base font-bold text-slate-900">
          Choose a time <span className="text-red-500">*</span>
        </label>
        <select id="tour-time" value={time} onChange={(e) => setTime(e.target.value)} className={selectClass}>
          {TIME_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </section>

      {/* 4. Live total */}
      <section className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="text-base font-bold text-slate-900">Price (USD)</h3>
        <p className="mt-2 font-serif text-3xl font-bold text-slate-900" aria-live="polite">
          {bookingTotal ? formatMoneyUsd(bookingTotal.amount) : "—"}
        </p>
        {bookingTotal?.breakdown.length ? (
          <ul className="mt-2 space-y-1 text-xs text-slate-600">
            {bookingTotal.breakdown.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        <p className="mt-2 text-xs text-slate-500">+ VAT where listed on package pricing.</p>
      </section>

      <BookingInquiryNotice variant="compact" className="mt-4" />

      {canContinue ? (
        <Link href={checkoutHref} className={`mt-5 min-h-12 ${btnAccentFullWidth}`}>
          Book now
        </Link>
      ) : (
        <span className={`mt-5 ${btnAccentDisabled}`}>Book now</span>
      )}
      {!selected ? (
        <p className="mt-2 text-center text-xs text-slate-500">Select a date to continue.</p>
      ) : participantTotal < 1 ? (
        <p className="mt-2 text-center text-xs text-slate-500">Add at least one participant.</p>
      ) : null}

      <p className="mt-4 text-xs italic text-slate-500">{BOOKING_FOOTNOTE}</p>
    </div>
  );
}
