import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutPageHeader } from "../../../../components/CheckoutPageHeader";
import { btnPrimary } from "../../../../components/button-styles";
import { getTourBySlug } from "../../../../data/tour-packages";
import { tourPageMeta } from "../../../../lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Payment confirmed" };
  return tourPageMeta(
    `Payment confirmed — ${tour.title}`,
    "Your PayPal payment was received. We will confirm your tour date by email.",
  );
}

export default async function TourCheckoutSuccessPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const sp = await searchParams;
  const orderId = typeof sp.orderId === "string" ? sp.orderId : null;

  return (
    <main className="min-h-[100svh] w-full bg-slate-50 text-slate-900">
      <CheckoutPageHeader tourSlug={tour.slug} />

      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl"
            aria-hidden
          >
            ✓
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Payment received</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Thank you for booking <strong>{tour.title}</strong>. Your PayPal payment was
            successful. Our team will confirm your date and send meeting details by email—usually
            within one business day.
          </p>
          {orderId ? (
            <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
              PayPal order reference:{" "}
              <span className="font-mono font-semibold text-slate-700">{orderId}</span>
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={`/tours/${slug}`} className={btnPrimary}>
              Back to tour
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
