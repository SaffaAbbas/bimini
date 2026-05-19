"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { btnPrimary, btnPrimaryFullWidth } from "./button-styles";
import { buildContactHref, formatMoneyUsd } from "../lib/tour-checkout-utils";
import { BookingInquiryNotice } from "./BookingInquiryNotice";
import { TourPriceList } from "./TourPriceList";

const COUPON_CODES: Record<string, number> = {
  BIMINI10: 0.1,
  BIMINI: 0.05,
};

type Props = {
  slug: string;
  tourTitle: string;
  tourImage: string;
  tourImageAlt: string;
  departureLabel: string;
  dateIso: string;
  timeValue: string;
  timeLabel: string;
  guests: number;
  durationLabel: string;
  fromDisplay: string;
  toDisplay: string;
  subtotal: number | null;
  estimateBasis: string;
  priceLines: readonly string[];
};

export function TourCheckoutView({
  slug,
  tourTitle,
  tourImage,
  tourImageAlt,
  departureLabel,
  dateIso,
  timeValue,
  timeLabel,
  guests,
  durationLabel,
  fromDisplay,
  toDisplay,
  subtotal,
  estimateBasis,
  priceLines,
}: Props) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const discountRate = appliedCoupon ? COUPON_CODES[appliedCoupon] ?? 0 : 0;

  const lineSubtotal = subtotal ?? 0;
  const discountAmount = subtotal != null ? lineSubtotal * discountRate : 0;
  const total = subtotal != null ? Math.max(0, lineSubtotal - discountAmount) : null;

  const contactBase = useMemo(
    () => ({
      slug,
      date: dateIso,
      guests,
      time: timeValue,
      ...(total != null ? { estimateTotal: total } : {}),
    }),
    [slug, dateIso, guests, timeValue, total]
  );

  function applyCoupon() {
    const key = couponInput.trim().toUpperCase();
    if (!key) {
      setCouponError("Enter a code.");
      return;
    }
    if (COUPON_CODES[key] == null) {
      setCouponError("That code is not valid.");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(key);
    setCouponError(null);
  }

  const displaySubtotal = subtotal != null ? formatMoneyUsd(lineSubtotal) : "—";
  const displayTotal = total != null ? formatMoneyUsd(total) : "—";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      <div
        className="mb-8 flex gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950 sm:px-5 sm:py-4"
        role="status"
      >
        <span className="text-lg" aria-hidden>
          ⏰
        </span>
        <p>
          <span className="font-bold">Check-in: </span>
          Please arrive and check in at least <strong>30 minutes</strong> before your scheduled start
          time so we can board on time.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-8 lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-4 sm:px-6">
              <span>Product</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Subtotal</span>
            </div>

            <div className="grid gap-4 border-b border-slate-100 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-start sm:gap-6 sm:p-6">
              <div className="flex gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                  <img
                    src={tourImage}
                    alt={tourImageAlt}
                    className="h-full w-full object-cover"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-bold text-slate-900">
                    Booking: {tourTitle}
                  </p>
                  <dl className="mt-3 space-y-1 text-sm text-slate-600">
                    <div>
                      <dt className="inline font-semibold text-slate-800">From: </dt>
                      <dd className="inline">{fromDisplay}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-800">To: </dt>
                      <dd className="inline">{toDisplay}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-800">Duration: </dt>
                      <dd className="inline">{durationLabel}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-800">Guests: </dt>
                      <dd className="inline">{guests}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-800">Start time: </dt>
                      <dd className="inline">{timeLabel}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-800">Departure / meet: </dt>
                      <dd className="inline text-pretty">{departureLabel}</dd>
                    </div>
                    <div className="pt-1 text-xs text-slate-500">{estimateBasis}</div>
                  </dl>
                  <TourPriceList
                    lines={priceLines}
                    className="mt-3 rounded-lg bg-slate-50/80 p-3 ring-1 ring-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:block sm:border-t-0 sm:pt-0 sm:text-center">
                <span className="text-xs font-bold uppercase text-slate-500 sm:hidden">Qty</span>
                <span className="text-sm font-semibold text-slate-900">1</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:block sm:border-t-0 sm:pt-0 sm:text-right">
                <span className="text-xs font-bold uppercase text-slate-500 sm:hidden">Subtotal</span>
                <span className="text-base font-bold text-slate-900">{displaySubtotal}</span>
              </div>

              <div className="col-span-full flex justify-end sm:col-span-1 sm:col-start-3">
                <Link
                  href={`/tours/${slug}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  title="Remove and return to tour"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
                  </svg>
                  Remove
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="coupon" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Coupon code
              </label>
              <input
                id="coupon"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError(null);
                }}
                placeholder="Try BIMINI10"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[color:var(--brand-primary)] focus:ring-2 focus:ring-[color:var(--brand-primary)]/20"
              />
              {couponError ? <p className="mt-1 text-xs font-semibold text-red-600">{couponError}</p> : null}
              {appliedCoupon ? (
                <p className="mt-1 text-xs font-semibold text-emerald-700">
                  Applied {appliedCoupon} — {(discountRate * 100).toFixed(0)}% off estimate
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={applyCoupon}
              className={`shrink-0 ${btnPrimary}`}
            >
              Apply coupon
            </button>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-slate-900">Cart totals</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="font-semibold text-slate-900">{displaySubtotal}</dd>
              </div>
              {discountRate > 0 && subtotal != null ? (
                <div className="flex justify-between gap-4 text-emerald-700">
                  <dt>Coupon</dt>
                  <dd className="font-semibold">−{formatMoneyUsd(discountAmount)}</dd>
                </div>
              ) : null}
              <div className="border-t border-dashed border-slate-200 pt-3">
                <div className="flex justify-between gap-4 text-base">
                  <dt className="font-bold text-slate-900">Total</dt>
                  <dd className="font-extrabold text-slate-900">{displayTotal}</dd>
                </div>
              </div>
            </dl>
            {subtotal == null ? (
              <p className="text-xs text-slate-500">
                We could not auto-calculate this package. Your total will be confirmed when you complete
                the form.
              </p>
            ) : null}

            <BookingInquiryNotice variant="compact" className="pt-1" />

            <div className="space-y-3 pt-2">
              <Link
                href={buildContactHref({ ...contactBase, pay: "message" })}
                className={`${btnPrimaryFullWidth} uppercase tracking-wide`}
              >
                Send booking request
              </Link>
              <p className="text-center text-xs font-semibold text-slate-400">— or —</p>
              <Link
                href={buildContactHref({ ...contactBase, pay: "paypal" })}
                className="flex w-full items-center justify-center rounded-full px-4 py-3.5 text-center text-sm font-extrabold text-[#003087] shadow-sm transition hover:brightness-95"
                style={{ backgroundColor: "#FFC439" }}
              >
                Pay with PayPal
              </Link>
            </div>

            <p className="text-xs italic leading-relaxed text-slate-500">
              Payments are coordinated after we confirm your date. We currently accept PayPal—submitting
              the form does not charge you immediately; we will follow up with secure PayPal payment
              instructions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
