import { SiteHeader } from "../components/SiteHeader";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[55svh] overflow-hidden">
        <img
          src="/images/img17.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/35 to-black/55"
          aria-hidden
        />
        <SiteHeader bookNowHref="/contact" />

        <div className="mx-auto flex min-h-[55svh] max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl">
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none">
          <h2>Information we collect</h2>
          <p>
            When you contact us or request a booking, we may collect your name,
            email, phone number, and booking preferences.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to inquiries and manage bookings</li>
            <li>To provide updates about your tour</li>
            <li>To improve our services</li>
          </ul>

          <h2>Sharing</h2>
          <p>
            We do not sell your personal information. We may share data only as
            needed to operate tours (e.g., vendors) or comply with law.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this policy, contact{" "}
            <strong>bookings@toursbimini.com</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}
