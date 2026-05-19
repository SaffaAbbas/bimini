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

/**
 * Rough USD estimate before VAT — matches listed tiers where possible.
 * Final price is always confirmed by staff.
 */
export function estimateSubtotalUsd(
  slug: string,
  priceLines: readonly string[],
  guests: number
): { amount: number; basis: string } | null {
  const g = Math.max(1, Math.min(50, guests));
  const j = priceLines.join(" | ");

  if (slug === "fishing-charter") {
    const m = j.match(/\$([\d,]+)/);
    if (m) return { amount: Number(m[1].replace(/,/g, "")), basis: "Private charter (up to 4 guests)" };
  }

  if (slug === "eco-tour") {
    const m = j.match(/\$([\d,]+)/);
    if (m) return { amount: Number(m[1].replace(/,/g, "")) * g, basis: `Per person × ${g} guests` };
  }

  if (slug === "family-fun") {
    return { amount: 500, basis: "Family package (up to 4 guests)" };
  }

  if (slug === "family-culture") {
    return { amount: 600, basis: "Family package (up to 4 guests)" };
  }

  if (slug === "little-bit-of-that" || slug === "two-for-one" || slug === "underwater-adventure") {
    const fam = j.match(/Family\s*\(4[^)]*\):\s*\$([\d,]+)/i);
    if (fam) return { amount: Number(fam[1].replace(/,/g, "")), basis: "Family (4) package rate" };
  }

  if (slug === "down-for-whateva") {
    const adult = j.match(/Adults[^\d$]*\$([\d,]+)/i);
    if (adult) return { amount: Number(adult[1].replace(/,/g, "")) * g, basis: `Adult rate × ${g} guests` };
    const fam = j.match(/Family[^\d$]*\$([\d,]+)/i);
    if (fam) return { amount: Number(fam[1].replace(/,/g, "")), basis: "Family (4) package rate" };
  }

  if (slug === "private-tours") {
    const m = j.match(/\$([\d,]+)/);
    if (m) return { amount: Number(m[1].replace(/,/g, "")), basis: "Starting quote (min. group of 4)" };
  }

  const adultLine = j.match(/Adults:\s*\$([\d,]+(?:\.\d{2})?)/i);
  if (adultLine) {
    const rate = Number(adultLine[1].replace(/,/g, ""));
    return { amount: rate * g, basis: `Adult rate × ${g} guests (kids priced separately)` };
  }

  const any = j.match(/\$([\d,]+(?:\.\d{2})?)/);
  if (any) return { amount: Number(any[1].replace(/,/g, "")), basis: "From listed package rate (+ VAT)" };

  return null;
}

export function buildContactHref(opts: {
  slug: string;
  date: string;
  guests: number;
  time: string;
  pay?: "paypal" | "message";
  estimateTotal?: number;
}): string {
  const q = new URLSearchParams();
  q.set("package", opts.slug);
  q.set("date", opts.date);
  q.set("guests", String(opts.guests));
  q.set("time", opts.time);
  if (opts.pay && opts.pay !== "message") q.set("pay", opts.pay);
  if (opts.estimateTotal != null) q.set("estimateTotal", String(Math.round(opts.estimateTotal * 100) / 100));
  return `/contact?${q.toString()}`;
}
