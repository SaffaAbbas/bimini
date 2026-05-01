import { SiteHeader } from "../components/SiteHeader";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[55svh] overflow-hidden">
        <div className="absolute inset-0 -z-30 bg-[color:var(--brand-deep)]" />
        <img
          src="/images/img11.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-100"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(6,42,68,0.25),rgba(6,42,68,0.55))]" />
        <SiteHeader bookNowHref="/contact" />

        <div className="mx-auto flex min-h-[55svh] max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Terms & Conditions
            </h1>
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
