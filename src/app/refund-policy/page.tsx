import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { RevealSection } from "../components/RevealSection";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Cancellation, refund, and weather policies for Bimini Tours & Adventures.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <PageHero
        title="Refund Policy"
        imageSrc="/images/img17.jpg"
        minHeightClass="min-h-[55svh]"
      />

      <RevealSection className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
          <h2>Cancellation / Refund Policy</h2>
          <ul>
            <li>No refunds will be issued for no-shows.</li>
            <li>
              No refunds will be issued for passengers for cancellations made
              less than <strong>48 hours</strong> before the reserved trip.
            </li>
            <li>
              Private charters will not be refunded for cancellations made less
              than <strong>7 days</strong> before the reserved trip.
            </li>
            <li>
              If your excursion is canceled, or you cannot join a rescheduled
              trip date, you will receive a <strong>full refund</strong>.
            </li>
            <li>
              Refunds are processed immediately, but depending on your bank, it
              may take a few business days to appear on your statement.
            </li>
          </ul>

          <h2>Weather Policy</h2>
          <ul>
            <li>All tours are weather permitting.</li>
            <li>
              We do our best to reschedule the tour date wherever possible
              instead of canceling.
            </li>
            <li>
              If the Captain has canceled the tour due to weather, we will
              provide you with a <strong>full refund</strong>.
            </li>
            <li>
              Please check your emails <strong>12–24 hours</strong> before your
              tour for weather updates, cancellations, or rescheduling notices.
            </li>
          </ul>

          <p className="not-prose mt-10 text-sm text-slate-600">
            Questions? Contact{" "}
            <a
              className="font-semibold text-[color:var(--brand-primary)] hover:underline"
              href="/contact"
            >
              Bimini Tours &amp; Adventures
            </a>{" "}
            or call <strong>(242) 826-TOUR (8687)</strong>.
          </p>
        </div>
      </RevealSection>
    </main>
  );
}
