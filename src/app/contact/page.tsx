import { Suspense } from "react";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { ContactForm } from "../components/ContactForm";
import { ContactInfoPanel } from "../components/ContactInfoPanel";
import { GallerySection } from "../components/GallerySection";
import { PageHero } from "../components/PageHero";
import { RevealSection } from "../components/RevealSection";
import { SectionHeading } from "../components/SectionHeading";
import { SiteHeader } from "../components/SiteHeader";
import { sectionY } from "../lib/section-spacing";

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

      <PageHero
        title="Contact Us"
        subtitle="Book your adventure, ask a question, or plan a custom day on the water—we're here to help."
        imageSrc="/images/new33.jpeg"
        imageAlt="Bimini waters at sunset"
        minHeightClass="min-h-[65svh] sm:min-h-[75svh] lg:min-h-[80svh]"
        showWave
      />

      <RevealSection
        id="form"
        className="relative overflow-hidden"
        delayMs={0}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 40% at 100% 0%, rgba(18, 167, 255, 0.08), transparent), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(245, 196, 0, 0.06), transparent)",
          }}
        />

        <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${sectionY}`}>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="GET IN TOUCH"
                title="Let's plan your perfect island adventure"
                subtitle="Tell us your dates, group size, and dream experience—we'll reply with availability and next steps."
                align="left"
                className="!max-w-none"
              />
              <div className="mt-10">
                <ContactInfoPanel />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/90 sm:p-8 lg:p-10">
                <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
                  QUICK MESSAGE
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Fill this out and we&apos;ll respond with availability and
                  booking steps. Prefer to talk? Call or text anytime.
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
        </div>
      </RevealSection>

      <GallerySection
        variant="marquee"
        showHeading
        showViewAll
        compact
        className="border-t border-slate-100 bg-slate-50/40"
      />

      <BiminiDayCta />
    </main>
  );
}
