import type { Metadata } from "next";
import { Suspense } from "react";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { ContactForm } from "../components/ContactForm";
import { ContactInfoPanel } from "../components/ContactInfoPanel";
import { ContactMapSection } from "../components/ContactMapSection";
import { OperatingHoursCard } from "../components/OperatingHoursCard";
import { PageHero } from "../components/PageHero";
import { RevealSection } from "../components/RevealSection";
import { SectionHeading } from "../components/SectionHeading";
import { SiteHeader } from "../components/SiteHeader";
import { TravelGuideSection } from "../components/TravelGuideSection";
import { getContactPackageOptions } from "../data/tour-packages";
import { pageMeta } from "../lib/seo";
import { sectionY } from "../lib/section-spacing";

export const metadata: Metadata = {
  ...pageMeta(
    "Contact Us",
    "Book your Bimini tour, ask questions, or plan a custom charter. Call, WhatsApp +1 (242) 826-8687, email bookings@toursbimini.com, or send a message—we reply quickly.",
  ),
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const packageOptions = getContactPackageOptions();

  return (
    <main className="min-h-[100svh] w-full overflow-x-clip bg-white text-slate-900">
      <SiteHeader bookNowHref="#form" />

      <PageHero
        title="Contact Us"
        subtitle="Bimini Tours & Adventures."
        imageSrc="/images/new33.jpeg"
        imageAlt="Bimini waters at sunset"
        minHeightClass="min-h-[65svh] sm:min-h-[75svh] lg:min-h-[100svh]"
        showWave
      />

      <RevealSection id="form" className="relative overflow-x-clip" delayMs={0}>
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 40% at 100% 0%, rgba(18, 167, 255, 0.08), transparent), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(245, 196, 0, 0.06), transparent)",
          }}
        />

        <div
          className={`mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8 ${sectionY}`}
        >
          <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <SectionHeading
                eyebrow="GET IN TOUCH"
                title="Let's plan your perfect island adventure"
                subtitle="Tell us your dates, group size, and dream experience—we'll reply with availability and next steps."
                align="left"
                className="!max-w-none"
              />
              <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                <ContactInfoPanel />
                <OperatingHoursCard />
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="min-w-0 rounded-2xl bg-white p-4 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/90 sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">
                <p className="text-xs font-extrabold tracking-widest text-[color:var(--brand-primary)] sm:text-sm">
                  QUICK MESSAGE
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Fill this out and we&apos;ll respond with availability and
                  booking steps. Prefer WhatsApp or a call? Use the contact
                  options <span className="lg:hidden">above</span>
                  <span className="hidden lg:inline">on the left</span>.
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

      <ContactMapSection />

      {/* <TravelGuideSection /> */}

      <BiminiDayCta />
    </main>
  );
}
