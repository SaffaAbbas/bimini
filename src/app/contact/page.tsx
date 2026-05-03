import { Suspense } from "react";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { ContactForm } from "../components/ContactForm";
import { RevealSection } from "../components/RevealSection";
import { SiteHeader } from "../components/SiteHeader";

export default function ContactPage() {
  const packageOptions = [
    { value: "real-deal", label: "The Real Deal Package" },
    { value: "bimini-adventure", label: "Bimini Adventure Package" },
    { value: "fishing-charter", label: "Bimini Fishing Charter Package" },
    { value: "eco-tour", label: "Bimini Eco‑Tour Package" },
    { value: "family-fun", label: "Bimini Family Fun Package" },
    {
      value: "family-culture",
      label: "Bimini Family Fun‑Filled Culture Package",
    },
    {
      value: "little-bit-of-that",
      label: "Bimini Little Bit & Little Bit of That Package",
    },
    { value: "two-for-one", label: "Two for One Island Tour" },
    {
      value: "underwater-adventure",
      label: "Bimini Underwater Adventure Tour",
    },
    { value: "down-for-whateva", label: "Down for Whateva Tour Package" },
    { value: "private-tours", label: "Private Tours" },
  ];

  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="#form" />

      <header className="group relative isolate min-h-[48svh] overflow-hidden sm:min-h-[50svh]">
        <img
          src="/images/hero3.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="mx-auto flex min-h-[48svh] max-w-7xl flex-col px-6 pb-12 pt-24 sm:min-h-[50svh] lg:px-8 lg:pb-16 lg:pt-28">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-white sm:text-lg">
              Contact us to book your adventure, Call/text us anytime
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 1440 120"
            className="h-20 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,72 C180,112 360,30 540,72 C720,112 900,30 1080,72 C1260,112 1350,35 1440,72 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </header>

      <RevealSection
        id="form"
        className="mx-auto max-w-7xl px-6 py-14 lg:px-8"
        delayMs={0}
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-3 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-extrabold text-slate-900">Phone</p>
                <p className="text-sm font-semibold text-slate-700">
                  (242) 826‑TOUR (8687)
                </p>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-extrabold text-slate-900">Email</p>
                <p className="text-sm font-semibold text-slate-700">
                  bookings@toursbimini.com
                </p>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-extrabold text-slate-900">Hours</p>
                <p className="text-sm font-semibold text-slate-700">
                  8:00 AM – 5:00 PM
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-slate-600">
                Cancellation Policy: 48 hours before = full refund. After that =
                50% fee.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-xl sm:p-8">
              <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
                QUICK MESSAGE
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Fill this out and we’ll respond with availability and booking
                steps.
              </p>
              <div className="mt-6">
                <Suspense
                  fallback={
                    <div className="h-64 animate-pulse rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
                  }
                >
                  <ContactForm packageOptions={packageOptions} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <BiminiDayCta />
    </main>
  );
}
