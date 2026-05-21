import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckoutPageHeader } from "../../../components/CheckoutPageHeader";
import { TourCheckoutView } from "../../../components/TourCheckoutView";
import { getTourBySlug } from "../../../data/tour-packages";
import { getPayPalClientIdPublic } from "../../../lib/paypal-env";
import { tourPageMeta } from "../../../lib/seo";
import {
  parseParticipantsFromSearchParams,
  totalParticipants,
} from "../../../lib/tour-participant-pricing";
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
    `Review dates, guests, and pricing for ${tour.title}, then pay with PayPal or send a booking request.`,
  );
}

export default async function TourCheckoutPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const sp = await searchParams;
  const dateRaw = typeof sp.date === "string" ? sp.date : undefined;
  const timeRaw = typeof sp.time === "string" ? sp.time : undefined;

  if (!dateRaw || !/^\d{4}-\d{2}-\d{2}$/.test(dateRaw)) {
    redirect(`/tours/${slug}`);
  }
  if (!timeRaw) {
    redirect(`/tours/${slug}`);
  }

  const participants = parseParticipantsFromSearchParams({
    adults: typeof sp.adults === "string" ? sp.adults : undefined,
    children: typeof sp.children === "string" ? sp.children : undefined,
    infants: typeof sp.infants === "string" ? sp.infants : undefined,
    guests: typeof sp.guests === "string" ? sp.guests : undefined,
  });
  const guests = totalParticipants(participants);
  if (guests < 1) {
    redirect(`/tours/${slug}`);
  }
  const start = combineDateAndTime(dateRaw, timeRaw);
  if (!start || Number.isNaN(start.getTime())) {
    redirect(`/tours/${slug}`);
  }

  const hours = parseDurationHours(tour.duration);
  const end = addHours(start, hours);
  const est = estimateSubtotalUsd(tour.slug, tour.priceLines, participants);
  const paypalClientId = getPayPalClientIdPublic();

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
        adults={participants.adults}
        children={participants.children}
        infants={participants.infants}
        priceBreakdown={est?.breakdown ?? []}
        durationLabel={tour.duration}
        fromDisplay={formatBookingWhen(start)}
        toDisplay={formatBookingWhen(end)}
        subtotal={est?.amount ?? null}
        estimateBasis={est?.basis ?? "See package pricing on this page."}
        priceLines={tour.priceLines}
        paypalClientId={paypalClientId}
      />
    </main>
  );
}
