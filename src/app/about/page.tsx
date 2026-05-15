import type { Metadata } from "next";
import { AnimatedButton } from "../components/AnimatedButton";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { HighlightsStrip } from "../components/HighlightsStrip";
import { MissionSection } from "../components/MissionSection";
import { PageHero } from "../components/PageHero";
import { ParallaxQuoteBanner } from "../components/ParallaxQuoteBanner";
import { RevealSection } from "../components/RevealSection";
import { SectionHeading } from "../components/SectionHeading";
import { SiteHeader } from "../components/SiteHeader";
import { WhatWeOfferCards } from "../components/WhatWeOfferCards";
import { WhyChooseGrid } from "../components/WhyChooseGrid";

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

const highlights = [
  { value: "Bahamas", label: "Westernmost Out Islands" },
  { value: "50 mi", label: "From Miami, Florida" },
  { value: "2", label: "Islands — North & South Bimini" },
  { value: "Local", label: "Bahamian guides & captains" },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <PageHero
        title="About Us"
        subtitle="Bimini: the gateway to paradise—where every moment is a treasure."
        imageSrc="/images/new31.jpeg"
        imageAlt="Bimini coastline"
        minHeightClass="min-h-[65svh] sm:min-h-[75svh] lg:min-h-[85svh]"
        showWave
      />

      <RevealSection className="relative z-0 bg-white" delayMs={80}>
        <MissionSection />
      </RevealSection>

      <RevealSection delayMs={120} className="p-0">
        <HighlightsStrip items={highlights} />
      </RevealSection>

      <RevealSection className="pt-12 pb-6 lg:pt-20 lg:pb-10" delayMs={160}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHAT WE OFFER"
            title="Tours for every kind of traveler"
            subtitle="Snorkeling, fishing, culture, and eco-adventures—each led by guides who call Bimini home."
          />
          <WhatWeOfferCards items={offerings} />
        </div>
      </RevealSection>

      <RevealSection className="bg-slate-50/60 py-14 lg:py-20" delayMs={200}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="WHY CHOOSE US"
            title="What makes Bimini—and us—special"
            subtitle="A quick snapshot of the island story and how we help you experience it authentically."
          />
          <WhyChooseGrid items={whyChoose} />
        </div>
      </RevealSection>

      <ParallaxQuoteBanner
        imageSrc="/images/new41.jpeg"
        imageAlt="Beautiful Bimini ocean view"
        // quote="The sea, once it casts its spell, holds one in its net of wonder forever."
        // attribution="— Jacques Cousteau"
      />

      <RevealSection className="bg-white py-16 lg:py-24" delayMs={280}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <SectionHeading
            title="Experience Bimini like never before"
            subtitle="Join us for exploration, relaxation, and adventure. Whether you want thrills, culture, or a quiet beach day—we have the perfect tour for you."
          />
          <p className="mt-6 text-pretty text-base font-semibold text-slate-800 sm:text-lg">
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
          <AnimatedButton
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[color:var(--brand-accent)] px-8 py-3.5 text-sm font-extrabold text-[color:var(--brand-primary-2)] shadow-md hover:brightness-95 hover:shadow-lg sm:text-base"
          >
            Contact us
          </AnimatedButton>
        </div>
      </RevealSection>

      <BiminiDayCta />
    </main>
  );
}
