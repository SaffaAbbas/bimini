import type { Metadata } from "next";
import { RevealSection } from "../components/RevealSection";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bimini Tours & Adventures collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <SiteHeader bookNowHref="/contact" />

      <header className="group relative isolate min-h-[55svh] overflow-hidden">
        <img
          src="/images/img17.jpg"
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      <RevealSection className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
          <p className="lead text-lg">
            This Privacy Policy (&ldquo;Policy&rdquo;) explains how{" "}
            <strong>Bimini Tours &amp; Adventures</strong> (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
            the personal information of individuals (&ldquo;you,&rdquo;
            &ldquo;your,&rdquo; or &ldquo;user&rdquo;) when using our website
            and when booking or participating in tours and activities with us.
            We are committed to safeguarding your privacy and ensuring the
            security of your personal information. Please read this Policy
            carefully to understand our practices regarding your personal data.
          </p>

          <h2>Hosting</h2>
          <p>
            Our website is hosted on <strong>DigitalOcean Cloud Servers</strong>
            .
          </p>

          <h2>Information we collect</h2>
          <h3>Personal information</h3>
          <p>
            We may collect personal information such as your name, contact
            details (including email address, phone number, and address), date
            of birth, and payment information when you make a reservation or
            engage in tour activities with us.
          </p>
          <h3>Usage data</h3>
          <p>
            We may collect information about how you use our website, including
            your IP address, device information, browser type, pages visited,
            and referring website addresses.
          </p>
          <h3>Cookies and tracking technologies</h3>
          <p>
            We may use cookies and similar tracking technologies to enhance your
            experience on our website, improve our services, and collect usage
            data. You can control the use of cookies through your browser
            settings.
          </p>

          <h2>Use of information</h2>
          <p>
            We use the information collected to provide you with tour services,
            process reservations and payments, communicate with you, and deliver
            customer support.
          </p>
          <p>
            We may use your personal information to send you promotional offers,
            newsletters, and updates about our services. You can opt out of
            these communications at any time.
          </p>
          <p>
            We may use usage data and cookies to analyze trends, administer the
            website, track user activity, and gather demographic information for
            internal purposes.
          </p>

          <h2>Data sharing and disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties for their marketing purposes.
          </p>
          <p>
            We may share your information with our trusted service providers who
            assist us in operating our website, delivering services, or
            conducting business operations. These service providers are bound by
            confidentiality agreements and are prohibited from using your
            personal information for any other purpose.
          </p>
          <p>
            We may disclose your personal information if required by law, court
            order, or governmental regulation, or if we believe it is necessary
            to protect our rights, property, or safety, or the rights, property,
            or safety of others.
          </p>

          <h2>Data security</h2>
          <p>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction. However, no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Policy, unless a longer
            retention period is required or permitted by law.
          </p>

          <h2>Your rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information held by us. You can exercise these rights by contacting
            us using the contact details in{" "}
            <a href="#contact-privacy">Contact us</a> below.
          </p>
          <p>
            You may choose to opt out of receiving promotional communications
            from us by following the instructions provided in our communications
            or by contacting us directly.
          </p>
          <p>
            Please note that certain data may be exempt from these rights due to
            legal obligations or legitimate interests.
          </p>

          <h2>Third-party links</h2>
          <p>
            Our website may contain links to third-party websites or services.
            We are not responsible for the privacy practices or content of those
            websites. We encourage you to review the privacy policies of
            third-party websites before providing any personal information.
          </p>

          <h2 id="contact-privacy">Contact us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Policy or the handling of your personal information, contact us at{" "}
            <a href="mailto:bookings@toursbimini.com">
              <strong>bookings@toursbimini.com</strong>
            </a>{" "}
            or <strong>(242) 826-TOUR (8687)</strong>.
          </p>

          <h2>Updates to the Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal obligations. The updated Policy
            will be posted on our website, and the revised effective date will
            be indicated at the top of the Policy.
          </p>

          <p>
            By using our website and engaging in tour activities with Bimini
            Tours &amp; Adventures, you consent to the collection, use, and
            processing of your personal information as described in this Privacy
            Policy. If you do not agree with any part of this Policy, please
            refrain from using our website and services.
          </p>
        </div>
      </RevealSection>
    </main>
  );
}
