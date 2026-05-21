import Link from "next/link";
import type { TourPackage } from "../data/tour-packages";
import { RevealSection } from "./RevealSection";
import { TourBookingCalendar } from "./TourBookingCalendar";
import { BookingInquiryNotice } from "./BookingInquiryNotice";
import { TourBookingMedia } from "./TourBookingMedia";
import { TourPriceList } from "./TourPriceList";

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TourDetailView({ tour }: { tour: TourPackage }) {
  return (
    <>
      <header className="relative isolate min-h-[95svh] overflow-hidden sm:min-h-[78svh] lg:min-h-[90svh]">
        <img
          src={tour.imageSrc}
          alt={tour.imageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center scale-110"
          loading="eager"
          fetchPriority="high"
        />

        <div className="mx-auto flex min-h-[95svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-24 sm:min-h-[78svh] sm:pb-20 lg:px-8 lg:pt-28 lg:min-h-[90svh]">
          <p
            className="
    text-center text-xs font-extrabold uppercase
    tracking-[0.2em] text-white
    [text-shadow:0_2px_8px_rgba(0,0,0,1),0_0_12px_rgba(0,0,0,0.9)]
  "
          >
            Tour packages
          </p>

          <h1
            className="
    mt-3 text-center font-serif text-3xl font-bold tracking-tight
    text-white text-balance
    drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]
    sm:text-4xl md:text-5xl
  "
          >
            {tour.title}
          </h1>
        </div>
      </header>

      <div className="bg-slate-100 pb-16 pt-12 sm:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#tours"
              className="text-sm font-semibold text-[color:var(--brand-primary)] hover:underline"
            >
              ← Back to all tours
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-10 lg:col-span-5">
              <RevealSection
                as="div"
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-8"
              >
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  {tour.title} includes:
                </h2>
                <ul className="mt-5 space-y-3">
                  {tour.includesChecklist.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-sm leading-relaxed text-slate-700"
                    >
                      <CheckIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </RevealSection>

              <RevealSection
                as="div"
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-8"
              >
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  What to bring
                </h2>
                <ul className="mt-5 space-y-3">
                  {tour.whatToBring.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-sm text-slate-700"
                    >
                      <CheckIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </RevealSection>

              <RevealSection as="div" className="space-y-3">
                <h2 className="px-1 font-serif text-xl font-bold text-slate-900">
                  Common questions
                </h2>
                {tour.faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-[color:var(--brand-primary)] [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start gap-2">
                        <span className="text-lg leading-none text-[color:var(--brand-primary)]">
                          +
                        </span>
                        {item.q}
                      </span>
                    </summary>
                    <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </details>
                ))}
              </RevealSection>

              <RevealSection
                as="div"
                className="overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80"
                delayMs={120}
              >
                <div className="relative isolate flex flex-col sm:flex-row">
                  <div className="relative h-36 shrink-0 sm:h-auto sm:w-2/5 sm:min-h-[11rem]">
                    <img
                      src={tour.imageSrc}
                      alt={tour.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/20"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center bg-white p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-primary)]">
                      Next step
                    </p>
                    <h2 className="mt-1 font-serif text-lg font-bold text-slate-900 sm:text-xl">
                      Book this experience
                    </h2>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600">
                      Choose adults, children, and infants, pick a date and time,
                      then book online or send a request.
                    </p>
                    <BookingInquiryNotice variant="compact" className="mt-3" />
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <a
                        href="#tour-book-calendar"
                        className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand-accent)] px-5 py-2.5 text-center text-xs font-extrabold uppercase tracking-wide text-[color:var(--brand-primary-2)] shadow-sm transition hover:brightness-95 motion-safe:hover:-translate-y-0.5"
                      >
                        Pick a date
                      </a>
                      <Link
                        href={`/contact?package=${encodeURIComponent(tour.slug)}`}
                        className="inline-flex items-center justify-center rounded-full border-2 border-[color:var(--brand-primary)] bg-white px-5 py-2.5 text-center text-xs font-extrabold uppercase tracking-wide text-[color:var(--brand-primary)] transition hover:bg-slate-50 motion-safe:hover:-translate-y-0.5"
                      >
                        Ask us anything
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            <div className="space-y-8 lg:col-span-7">
              <RevealSection
                as="div"
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80"
              >
                <div className="grid min-w-0 grid-cols-1">
                  <div className="min-w-0 w-full">
                    <TourBookingMedia tour={tour} />
                  </div>
                  <div className="min-w-0 w-full border-t border-slate-200 bg-white">
                    <TourBookingCalendar
                      tourSlug={tour.slug}
                      priceLines={tour.priceLines}
                    />
                  </div>
                </div>
              </RevealSection>
              <RevealSection
                as="div"
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-10"
              >
                <h2 className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Overview
                </h2>
                <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-slate-700">
                  {tour.overviewParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <h3 className="mt-10 font-serif text-lg font-bold text-slate-900">
                  Your experience includes
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {tour.experienceHighlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </RevealSection>

              <RevealSection
                as="div"
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-8"
              >
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  Pricing
                </h2>
                <TourPriceList lines={tour.priceLines} className="mt-5" size="md" />
                <p className="mt-4 text-xs font-medium text-red-600">
                  *All purchases are subject to applicable VAT / government
                  taxes as listed.
                </p>
              </RevealSection>

              {tour.footnote ? (
                <p className="text-sm leading-relaxed text-slate-600">
                  {tour.footnote}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
