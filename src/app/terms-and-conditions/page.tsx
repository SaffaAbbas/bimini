import type { Metadata } from "next";
import { RevealSection } from "../components/RevealSection";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for bookings and tours with Bimini Tours & Adventures.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <header className="group relative isolate min-h-[55svh] overflow-hidden">
        <img
          src="/images/img11.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10" aria-hidden />

        <div className="mx-auto flex min-h-[55svh] max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl">
              Terms &amp; Conditions
            </h1>
          </div>
        </div>
      </header>

      <RevealSection className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
          <p className="lead text-lg">
            These terms and conditions (&ldquo;Terms&rdquo;) constitute a
            legally binding agreement between you (&ldquo;Customer,&rdquo;
            &ldquo;You,&rdquo; or &ldquo;Your&rdquo;) and{" "}
            <strong>Bimini Tours &amp; Adventures</strong> (&ldquo;We,&rdquo;
            &ldquo;Us,&rdquo; or &ldquo;Our&rdquo;) governing bookings,
            participation in tours, charters, and related services. By accessing
            our services, you acknowledge and agree to comply with these Terms.
            Please read them carefully before booking or joining any activity
            with us.
          </p>

          <h2>Hosting</h2>
          <p>
            Our website is hosted on <strong>DigitalOcean servers</strong>{" "}
            located in New York, United States.
          </p>

          <h2>Tour agreement</h2>
          <p>
            You must be at least 18 years old to enter into this agreement or
            have the consent of a legal guardian.
          </p>
          <p>
            By entering into this agreement, you confirm that you possess the
            necessary skills, knowledge, and physical fitness to safely
            participate in the booked activities, including when boarding
            vessels or using equipment as directed by our crew.
          </p>
          <p>
            The service period begins at the scheduled departure or check-in
            time and ends at the agreed completion time. Late arrivals or late
            returns may be subject to additional charges or inability to join
            the group, without refund, where applicable.
          </p>
          <p>
            We reserve the right to refuse service to any individual for any
            reason, including but not limited to safety concerns or failure to
            meet eligibility requirements.
          </p>

          <h2>Reservation and payment</h2>
          <p>
            To make a reservation, you must provide accurate and complete
            information, including your name, contact details, and desired tour
            dates.
          </p>
          <p>
            A valid credit card or other accepted payment method may be required
            for reservations and will be charged according to the agreed-upon
            rates.
          </p>
          <p>
            Rates are subject to change without notice. However, once a
            reservation is confirmed, the agreed-upon rate will be honored
            unless otherwise stated in writing.
          </p>
          <p>
            Additional charges, such as fuel surcharges, park fees, equipment
            add-ons, or damages, may apply and will be specified at the time of
            reservation or before departure where possible.
          </p>

          <h2>Safety and liability</h2>
          <p>
            You are responsible for adhering to all safety guidelines provided
            by us, including local laws, regulations, and rules of navigation.
          </p>
          <p>
            We will provide safety instructions and guidelines before or during
            your tour. It is your responsibility to understand and follow these
            instructions.
          </p>
          <p>
            You assume risks and liabilities associated with participation in
            tours and use of equipment as directed, including but not limited to
            accidents, injuries, or property damage, except as may be required
            by applicable law.
          </p>
          <p>
            To the fullest extent permitted by law, we are not liable for
            personal injuries, damages, or losses incurred during the tour
            except in cases of gross negligence or willful misconduct.
          </p>

          <h2>Care and conduct</h2>
          <p>
            You agree to follow crew instructions and to behave responsibly and
            lawfully, including any applicable speed, noise, and environmental
            restrictions.
          </p>
          <p>
            You must not participate under the influence of alcohol, drugs, or
            other substances impairing judgment or coordination where it would
            endanger yourself or others.
          </p>
          <p>
            You are responsible for the proper care of any equipment provided to
            you during the tour. Damage or loss may result in additional
            charges.
          </p>
          <p>
            Equipment and facilities must be returned in the same condition as
            received, except for normal wear and tear. Excessive cleaning needs
            or damages may incur additional fees.
          </p>

          <h2>Cancellations and refunds</h2>
          <p>
            To cancel a reservation, you must notify us in accordance with our
            published cancellation policy (see our{" "}
            <a href="/refund-policy">Cancellation &amp; Refund Policy</a>).
          </p>
          <p>
            Late cancellations may be subject to fees as described in that
            policy.
          </p>
          <p>
            Refunds or credits, where applicable, may be subject to
            administrative fees or charges we reasonably incur.
          </p>

          <h2>Insurance</h2>
          <p>
            We strongly recommend that you carry appropriate insurance coverage
            to protect against damages, losses, or liabilities that may occur
            during your tour.
          </p>
          <p>
            You are responsible for any deductibles or costs not covered by your
            insurance policy in the event of damage or loss for which you are
            responsible.
          </p>

          <h2>Force majeure</h2>
          <p>
            We shall not be held liable for any delays, damages, or failures to
            perform our obligations under these Terms caused by circumstances
            beyond our reasonable control, including but not limited to acts of
            nature, natural disasters, strikes, or governmental restrictions.
          </p>

          <h2>Governing law and jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which we operate.
          </p>
          <p>
            Any disputes arising out of or in connection with these Terms shall
            be subject to the exclusive jurisdiction of the courts in that
            jurisdiction, where permitted by law.
          </p>

          <h2>Entire agreement</h2>
          <p>
            These Terms constitute the entire agreement between you and us
            regarding the subject matter hereof and supersede any prior
            agreements, understandings, or representations, whether written or
            oral.
          </p>

          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid, illegal, or
            unenforceable, the remaining provisions shall continue to be valid
            and enforceable to the fullest extent permitted by law.
          </p>

          <h2>Amendments</h2>
          <p>
            We reserve the right to modify or update these Terms at any time.
            Changes will be effective upon posting on our website or through
            other reasonable communication channels.
          </p>

          <p>
            By booking or participating in tours with Bimini Tours &amp;
            Adventures, you acknowledge that you have read, understood, and
            agreed to these Terms and Conditions. If you do not agree with any
            part of these Terms, you should not proceed with the booking
            process.
          </p>
        </div>
      </RevealSection>
    </main>
  );
}
