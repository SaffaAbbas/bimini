import { SiteHeader } from "../components/SiteHeader";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[55svh] overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(1400px_760px_at_20%_-10%,rgba(25,195,255,0.45),rgba(6,42,68,0)_62%),radial-gradient(1100px_660px_at_85%_10%,rgba(18,167,255,0.40),rgba(6,42,68,0)_60%),linear-gradient(to_bottom,rgba(6,42,68,0.92),rgba(6,42,68,0.92))]" />
        <SiteHeader bookNowHref="/contact" />

        <div className="mx-auto flex min-h-[55svh] max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-extrabold tracking-widest text-white/90">
              PRIVACY
            </p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/85 sm:text-lg">
              Replace this content with your official privacy policy. (I can
              format your final copy nicely.)
            </p>
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

