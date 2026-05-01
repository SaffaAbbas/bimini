import { SiteHeader } from "../components/SiteHeader";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[55svh] overflow-hidden">
        <div className="absolute inset-0 -z-30 bg-[color:var(--brand-deep)]" />
        <img
          src="/images/img17.jpg"
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
              Refund Policy
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate max-w-none">
          <h2>Cancellation Policy</h2>
          <ul>
            <li>
              Cancellations made <strong>48 hours</strong> before the tour date
              receive a <strong>full refund</strong>.
            </li>
            <li>
              Cancellations made within 48 hours incur a{" "}
              <strong>50% fee</strong>.
            </li>
          </ul>

          <h2>No-shows</h2>
          <p>No-shows are non-refundable unless otherwise agreed in writing.</p>

          <h2>Weather</h2>
          <p>
            If we cancel due to weather/safety conditions, you may choose a
            reschedule or a refund.
          </p>
        </div>
      </section>
    </main>
  );
}
