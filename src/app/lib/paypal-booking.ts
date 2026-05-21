import { getTourBySlug } from "../data/tour-packages";
import { couponDiscountRate } from "./paypal-coupons";
import {
  clampParticipants,
  totalParticipants,
  type ParticipantCounts,
} from "./tour-participant-pricing";
import { estimateSubtotalUsd, timeLabel } from "./tour-checkout-utils";

export type PayPalBookingInput = {
  slug: string;
  date: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  time: string;
  coupon?: string;
};

export type ResolvedPayPalBooking = {
  slug: string;
  tourTitle: string;
  date: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  time: string;
  timeLabel: string;
  coupon: string | null;
  subtotalUsd: number;
  discountUsd: number;
  totalUsd: number;
  description: string;
  customId: string;
};

function formatUsdForPayPal(amount: number): string {
  return amount.toFixed(2);
}

export function parsePayPalBookingBody(
  body: unknown,
): { ok: true; data: PayPalBookingInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const raw = body as Record<string, unknown>;
  const slug = String(raw.slug ?? "").trim();
  const date = String(raw.date ?? "").trim();
  const time = String(raw.time ?? "").trim();
  const parseN = (key: string) => {
    const v = raw[key];
    return typeof v === "number" ? v : Number(String(v ?? ""));
  };
  let adults = parseN("adults");
  const children = parseN("children");
  const infants = parseN("infants");
  const guestsRaw = parseN("guests");

  if (adults === 0 && children === 0 && infants === 0 && guestsRaw >= 1) {
    adults = guestsRaw;
  }

  const counts = clampParticipants({ adults, children, infants });
  const guests = totalParticipants(counts);

  const coupon =
    raw.coupon != null && String(raw.coupon).trim()
      ? String(raw.coupon).trim().toUpperCase()
      : undefined;

  if (!slug) return { ok: false, error: "Tour is required." };
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "Valid tour date is required." };
  }
  if (!time) return { ok: false, error: "Start time is required." };
  if (guests < 1 || guests > 50) {
    return { ok: false, error: "At least one participant is required (max 50)." };
  }

  return {
    ok: true,
    data: {
      slug,
      date,
      guests,
      adults: counts.adults,
      children: counts.children,
      infants: counts.infants,
      time,
      coupon,
    },
  };
}

export function resolvePayPalBooking(
  input: PayPalBookingInput,
): { ok: true; booking: ResolvedPayPalBooking } | { ok: false; error: string } {
  const tour = getTourBySlug(input.slug);
  if (!tour) return { ok: false, error: "Unknown tour package." };

  const participants: ParticipantCounts = {
    adults: input.adults,
    children: input.children,
    infants: input.infants,
  };
  const est = estimateSubtotalUsd(tour.slug, tour.priceLines, participants);
  if (!est) {
    return {
      ok: false,
      error:
        "We could not calculate a price for this package online. Please send a booking request instead.",
    };
  }

  const rate = couponDiscountRate(input.coupon);
  if (input.coupon && rate === 0) {
    return { ok: false, error: "That coupon code is not valid." };
  }

  const subtotalUsd = est.amount;
  const discountUsd = subtotalUsd * rate;
  const totalUsd = Math.max(0, subtotalUsd - discountUsd);

  if (totalUsd < 0.5) {
    return { ok: false, error: "Order total is too low to process." };
  }

  const coupon = input.coupon && rate > 0 ? input.coupon.toUpperCase() : null;
  const customId = [
    `slug=${tour.slug}`,
    `date=${input.date}`,
    `guests=${input.guests}`,
    `adults=${input.adults}`,
    `children=${input.children}`,
    `infants=${input.infants}`,
    `time=${input.time}`,
    coupon ? `coupon=${coupon}` : null,
  ]
    .filter(Boolean)
    .join("&");

  return {
    ok: true,
    booking: {
      slug: tour.slug,
      tourTitle: tour.title,
      date: input.date,
      guests: input.guests,
      adults: input.adults,
      children: input.children,
      infants: input.infants,
      time: input.time,
      timeLabel: timeLabel(input.time),
      coupon,
      subtotalUsd,
      discountUsd,
      totalUsd,
      description: `Bimini tour booking: ${tour.title}`,
      customId: customId.slice(0, 127),
    },
  };
}

export { formatUsdForPayPal };
