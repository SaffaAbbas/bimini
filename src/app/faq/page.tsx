import Link from "next/link";
import { BiminiDayCta } from "../components/BiminiDayCta";
import { FaqAccordion } from "../components/FaqAccordion";
import { PageHero } from "../components/PageHero";
import { RevealSection } from "../components/RevealSection";
import { SectionHeading } from "../components/SectionHeading";
import { SiteHeader } from "../components/SiteHeader";
import { siteFaqSections } from "../data/site-faq";
import { pageMeta } from "../lib/seo";

export const metadata = pageMeta(
  "FAQ",
  "Frequently asked questions about Bimini tours—booking, pricing, VAT, weather cancellations, what to bring, and getting to Bimini from Florida.",
);

export default function FAQPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <PageHero
        title="Frequently asked questions"
        subtitle="Booking, pricing, weather, and what to expect on your Bimini adventure."
        imageSrc="/images/new33.jpeg"
        imageAlt="Turquoise water in Bimini"
        minHeightClass="min-h-[48svh] sm:min-h-[52svh]"
        showWave
      />

      <RevealSection className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="HELP CENTER"
          title="Quick answers before you go"
          subtitle="For cancellation and refund details, see our policies linked below."
          align="center"
        />

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-600">
          <Link
            href="/refund-policy"
            className="font-semibold text-[color:var(--brand-primary)] hover:underline"
          >
            Refund Policy
          </Link>
          {" · "}
          <Link
            href="/terms-and-conditions"
            className="font-semibold text-[color:var(--brand-primary)] hover:underline"
          >
            Terms &amp; Conditions
          </Link>
          {" · "}
          <Link
            href="/contact"
            className="font-semibold text-[color:var(--brand-primary)] hover:underline"
          >
            Contact us
          </Link>
        </p>

        <div className="mt-12 space-y-12">
          {siteFaqSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                {section.title}
              </h2>
              <div className="mt-4">
                <FaqAccordion items={section.items} />
              </div>
            </section>
          ))}
        </div>
      </RevealSection>

      <BiminiDayCta />
    </main>
  );
}
