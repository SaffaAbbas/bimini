import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckoutPageHeader } from "../../../components/CheckoutPageHeader";
import { TourCheckoutView } from "../../../components/TourCheckoutView";
import { getTourBySlug } from "../../../data/tour-packages";
import { tourPageMeta } from "../../../lib/seo";
import {
  addHours,
  combineDateAndTime,
  estimateSubtotalUsd,
  formatBookingWhen,
  parseDurationHours,
  timeLabel,
} from "../../../lib/tour-checkout-utils";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Checkout" };
  return tourPageMeta(
    `Checkout — ${tour.title}`,
    `Review dates, guests, and pricing for ${tour.title}, then send a booking request. Payment is arranged after we confirm availability—not instant card checkout.`,
  );
}

export default async function TourCheckoutPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const sp = await searchParams;
  const dateRaw = typeof sp.date === "string" ? sp.date : undefined;
  const guestsRaw = typeof sp.guests === "string" ? sp.guests : undefined;
  const timeRaw = typeof sp.time === "string" ? sp.time : undefined;

  if (!dateRaw || !/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) {
    redirect(`/tours/${slug}`);
  }
  if (!guestsRaw || !/^\d+$/.test(guestsRaw)) {
    redirect(`/tours/${slug}`);
  }
  if (!timeRaw) {
    redirect(`/tours/${slug}`);
  }

  const guests = Math.min(50, Math.max(1, Number(guestsRaw)));
  const start = combineDateAndTime(dateRaw, timeRaw);
  if (!start || Number.isNaN(start.getTime())) {
    redirect(`/tours/${slug}`);
  }

  const hours = parseDurationHours(tour.duration);
  const end = addHours(start, hours);
  const est = estimateSubtotalUsd(tour.slug, tour.priceLines, guests);

  return (
    <main className="min-h-[100svh] w-full bg-slate-50 text-slate-900">
      <CheckoutPageHeader tourSlug={tour.slug} />

      <nav className="sr-only" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#tours">Tours</Link>
          </li>
          <li>
            <Link href={`/tours/${slug}`}>{tour.title}</Link>
          </li>
          <li aria-current="page">Checkout</li>
        </ol>
      </nav>

      <TourCheckoutView
        slug={tour.slug}
        tourTitle={tour.title}
        tourImage={tour.imageSrc}
        tourImageAlt={tour.imageAlt}
        departureLabel={tour.meetingPoint}
        dateIso={dateRaw}
        timeValue={timeRaw}
        timeLabel={timeLabel(timeRaw)}
        guests={guests}
        durationLabel={tour.duration}
        fromDisplay={formatBookingWhen(start)}
        toDisplay={formatBookingWhen(end)}
        subtotal={est?.amount ?? null}
        estimateBasis={est?.basis ?? "See package pricing on this page."}
        priceLines={tour.priceLines}
      />
    </main>
  );
}
