/** Shared booking/checkout helpers for tour detail + checkout pages. */

export const TOUR_TIME_LABELS: Record<string, string> = {
  "09:00": "9:00 AM",
  "11:00": "11:00 AM",
  "13:00": "1:00 PM",
  "15:00": "3:00 PM",
};

export function timeLabel(hhmm: string): string {
  return TOUR_TIME_LABELS[hhmm] ?? hhmm;
}

export function parseYmd(ymd: string): { y: number; m: number; d: number } | null {
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return { y: Number(m[1]), m: Number(m[2]) - 1, d: Number(m[3]) };
}

export function combineDateAndTime(ymd: string, timeHHmm: string): Date | null {
  const p = parseYmd(ymd);
  if (!p) return null;
  const [hh, mm] = timeHHmm.split(":").map((x) => Number(x));
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return new Date(p.y, p.m, p.d, hh, mm, 0, 0);
}

export function addHours(d: Date, hours: number): Date {
  return new Date(d.getTime() + hours * 60 * 60 * 1000);
}

/** Parse tour duration string into approximate hours for end-time display. */
export function parseDurationHours(duration: string): number {
  const lower = duration.toLowerCase();
  if (lower.includes("half day") || /\b4\s*hours?\b/.test(lower)) return 4;
  const approx = lower.match(/approx\.?\s*(\d+)/);
  if (approx) return Number(approx[1]);
  if (/2\s*½|2\.5|2½/.test(lower)) return 2.5;
  const range = lower.match(/(\d+)\s*[–-]\s*(\d+)\s*hours?/);
  if (range) return (Number(range[1]) + Number(range[2])) / 2;
  const m = lower.match(/(\d+(?:\.\d+)?)\s*hours?/);
  if (m) return Number(m[1]);
  if (lower.includes("custom")) return 4;
  return 3;
}

export function formatBookingWhen(d: Date): string {
  return d.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatMoneyUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

import {
  calculateBookingTotal,
  type ParticipantCounts,
  participantCountsFromGuests,
} from "./tour-participant-pricing";

/**
 * USD estimate before VAT from participant counts (or legacy guest count).
 * Final price is always confirmed by staff when noted on the tour.
 */
export function estimateSubtotalUsd(
  slug: string,
  priceLines: readonly string[],
  guestsOrParticipants: number | ParticipantCounts,
): { amount: number; basis: string; breakdown?: string[] } | null {
  const counts =
    typeof guestsOrParticipants === "number"
      ? participantCountsFromGuests(guestsOrParticipants)
      : guestsOrParticipants;

  const result = calculateBookingTotal(slug, priceLines, counts);
  if (!result) return null;

  return {
    amount: result.amount,
    basis: result.basis,
    breakdown: result.breakdown,
  };
}

export function buildContactHref(opts: {
  slug: string;
  date: string;
  guests: number;
  time: string;
  adults?: number;
  children?: number;
  infants?: number;
  pay?: "paypal" | "message";
  estimateTotal?: number;
}): string {
  const q = new URLSearchParams();
  q.set("package", opts.slug);
  q.set("date", opts.date);
  q.set("guests", String(opts.guests));
  q.set("time", opts.time);
  if (opts.adults != null) q.set("adults", String(opts.adults));
  if (opts.children != null) q.set("children", String(opts.children));
  if (opts.infants != null) q.set("infants", String(opts.infants));
  if (opts.pay && opts.pay !== "message") q.set("pay", opts.pay);
  if (opts.estimateTotal != null) q.set("estimateTotal", String(Math.round(opts.estimateTotal * 100) / 100));
  return `/contact?${q.toString()}`;
}
