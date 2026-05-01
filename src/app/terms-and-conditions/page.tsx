import { SiteHeader } from "../components/SiteHeader";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[55svh] overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(1400px_760px_at_20%_-10%,rgba(25,195,255,0.45),rgba(6,42,68,0)_62%),radial-gradient(1100px_660px_at_85%_10%,rgba(18,167,255,0.40),rgba(6,42,68,0)_60%),linear-gradient(to_bottom,rgba(6,42,68,0.92),rgba(6,42,68,0.92))]" />
        <SiteHeader bookNowHref="/contact" />

        <div className="mx-auto flex min-h-[55svh] max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-extrabold tracking-widest text-white/90">
              TERMS
            </p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/85 sm:text-lg">
              Replace this content with your official terms. (I can format your
              final copy nicely.)
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none">
          <h2>Overview</h2>
          <p>
            These Terms &amp; Conditions govern bookings and participation in
            tours offered by Bimini Tours &amp; Adventures.
          </p>

          <h2>Bookings</h2>
          <ul>
            <li>Advance booking is recommended, especially in peak seasons.</li>
            <li>Group discounts may apply for groups of 10 or more.</li>
          </ul>

          <h2>Safety</h2>
          <ul>
            <li>Guests must follow guide instructions at all times.</li>
            <li>Some activities may have age/health restrictions.</li>
          </ul>

          <h2>Weather &amp; Changes</h2>
          <p>
            Tours may be adjusted or rescheduled due to weather, sea conditions,
            or safety considerations.
          </p>
        </div>
      </section>
    </main>
  );
}

