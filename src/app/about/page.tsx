import Link from "next/link";
import type { Metadata } from "next";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { RevealSection } from "../components/RevealSection";
import { SiteHeader } from "../components/SiteHeader";
import { WhatWeOfferCards } from "../components/WhatWeOfferCards";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Bimini—the gateway to paradise—and how Bimini Tours & Adventures connects you with island culture, nature, and unforgettable tours.",
};

const whyChoose = [
  {
    title: "The Gateway to Paradise",
    body: "Just 50 miles off Florida, North and South Bimini and the surrounding cays offer turquoise water, white sand, and vibrant marine life—a true Bahamian gem for adventure, relaxation, and memories that last.",
  },
  {
    title: "Rich History & Culture",
    body: "Walk in the footsteps of legends like Ernest Hemingway, explore Alice Town’s color and craft, and visit the Bimini Museum to connect with fishing heritage, rum-running stories, and warm island hospitality.",
  },
  {
    title: "Natural Wonders",
    body: "From Radio Beach and Bikini Beach to coral reefs and wrecks, Bimini stuns above and below the water. Discover the Bimini Road and the Healing Hole—nature and mystery side by side.",
  },
  {
    title: "Adventure & Culinary Delights",
    body: "Fish for marlin, tuna, and bonefish; snorkel and dive; cruise the cays or kayak the mangroves—then savor conch fritters, lobster, and Bimini bread with ocean views and sunset skies.",
  },
] as const;

const offerings = [
  {
    title: "Snorkeling and Diving Excursions",
    body: "Explore the vibrant underwater world of Bimini with guided snorkeling and diving trips to stunning coral reefs, shipwrecks, and marine parks. Witness the incredible biodiversity that thrives beneath the surface.",
    imageSrc: "/images/new35.jpeg",
    imageAlt:
      "Snorkelers exploring clear turquoise water over a coral reef in Bimini",
  },
  {
    title: "Fishing Charters",
    body: "Experience world-class fishing in the crystal-clear waters of Bimini. Whether you're a seasoned angler or a beginner, our expert captains will guide you to the best fishing spots, where you can catch marlin, tuna, and more.",
    imageSrc: "/images/new26.jpeg",
    imageAlt: "Sport fishing boat on open blue water near Bimini",
  },
  {
    title: "Island Tours",
    body: "Discover the rich history and culture of Bimini on our guided island tours. Visit historical landmarks, local markets, and charming villages while learning about the island's unique heritage.",
    imageSrc: "/images/new42.jpeg",
    imageAlt: "Pristine Bimini beach with white sand and calm turquoise sea",
  },
  {
    title: "Eco-Adventures",
    body: "Immerse yourself in the natural beauty of Bimini with eco-friendly tours that include kayaking through mangroves, bird watching, and exploring pristine beaches. Our eco-tours are designed to educate and inspire while preserving the island's delicate ecosystems.",
    imageSrc: "/images/new23.jpeg",
    imageAlt: "Coastal nature and shallow tropical water along Bimini",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <header className="group relative isolate min-h-[65svh] overflow-hidden sm:min-h-[75svh] lg:min-h-[85svh]">
        <img
          src="/images/new31.jpeg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="mx-auto flex min-h-[65svh] max-w-7xl flex-col px-6 pb-12 pt-24 sm:min-h-[75svh] lg:px-8 lg:pb-16 lg:pt-28">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white sm:text-lg">
              Bimini: the gateway to paradise—where every moment is a treasure.
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
      <RevealSection className="relative z-0 bg-white" delayMs={80}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none lg:text-left">
                <p className="text-xs font-semibold uppercase leading-snug tracking-[0.18em] text-[color:var(--brand-primary)] sm:text-sm">
                  The mission behind every tour.
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-800 sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-6 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
                  We connect travelers with Bimini&apos;s landscapes and
                  experiences through personalized tours and expert local guides
                  who know the water, wildlife, and history firsthand. We share
                  the island respectfully highlighting its culture and natural
                  beauty while helping guests feel at ease from the first
                  question to the last photo.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="group aspect-[3/3] w-full overflow-hidden rounded-1xl bg-slate-100 shadow-sm ring-1 ring-slate-200 motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 hover:shadow-xl motion-safe:hover:-translate-y-1">
                <img
                  src="/images/new37.jpeg"
                  alt="Bimini shoreline and clear water"
                  className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* What we offer */}
      <RevealSection className="pt-12 pb-6 lg:pt-16 lg:pb-8" delayMs={160}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-blue-800 sm:text-4xl">
            What We Offer
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Bimini Tours &amp; Adventures is proud to offer a diverse range of
            tours and activities designed to cater to every type of traveler.
          </p>
          <WhatWeOfferCards items={offerings} />
        </div>
      </RevealSection>

      {/* Why choose us — content from your island story */}
      <RevealSection className="pt-6 pb-14 lg:pt-8 lg:pb-20" delayMs={240}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-blue-800 sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
            A quick snapshot of what makes Bimini—and touring with us—special.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {whyChoose.map((card) => (
              <div
                key={card.title}
                className="flex h-full flex-col rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg sm:p-7"
              >
                <div className="flex min-h-[3.25rem] items-center justify-center">
                  <h3 className="text-balance text-base font-extrabold text-[color:var(--brand-primary)] sm:text-lg">
                    {card.title}
                  </h3>
                </div>
                <div
                  className="mx-auto my-4 h-px w-14 shrink-0 bg-[color:var(--brand-primary)]/25"
                  aria-hidden
                />
                <div className="flex flex-1 items-start justify-center">
                  <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Full width image section */}
      <RevealSection
        className="relative overflow-hidden py-6 lg:py-10"
        delayMs={280}
      >
        <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[520px]">
          <img
            src="/images/new41.jpeg"
            alt="Beautiful Bimini ocean view"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black/30" /> */}
        </div>
      </RevealSection>

      {/* Closing CTA */}
      <RevealSection className="bg-white py-16 lg:py-24" delayMs={320}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-blue-800 sm:text-3xl">
            Experience Bimini Like Never Before
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Join us at Bimini Tours &amp; Adventures and embark on a journey
            filled with exploration, relaxation, and adventure. Our friendly and
            knowledgeable team is here to ensure that your visit to Bimini is
            not just a trip, but an experience of a lifetime. Whether
            you&apos;re looking for thrilling activities, cultural insights, or
            simply a day of relaxation on the beach, we have the perfect tour
            for you.
          </p>
          <p className="mt-4 text-pretty text-base font-semibold text-slate-800 sm:text-lg">
            Book your adventure today and discover the magic of Bimini with
            Bimini Tours &amp; Adventures!
          </p>
          <p className="mt-6 text-sm text-slate-600">
            Questions or bookings:{" "}
            <a
              href="tel:+12428268687"
              className="font-semibold text-[color:var(--brand-primary)] hover:underline"
            >
              (242) 826-TOUR (8687)
            </a>
            {" · "}
            <a
              href="https://www.toursbimini.com"
              className="font-semibold text-[color:var(--brand-primary)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              toursbimini.com
            </a>
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[color:var(--brand-accent)] px-8 py-3.5 text-sm font-extrabold text-[color:var(--brand-primary-2)] shadow-md transition-all duration-200 hover:brightness-95 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg active:translate-y-0 sm:text-base"
          >
            Contact us
          </Link>
        </div>
      </RevealSection>

      <BiminiDayCta />
    </main>
  );
}
