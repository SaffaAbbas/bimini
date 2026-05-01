import { SiteHeader } from "../components/SiteHeader";

export default function FAQPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[60svh] overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(1400px_760px_at_20%_-10%,rgba(25,195,255,0.45),rgba(6,42,68,0)_62%),radial-gradient(1100px_660px_at_85%_10%,rgba(18,167,255,0.40),rgba(6,42,68,0)_60%),linear-gradient(to_bottom,rgba(6,42,68,0.92),rgba(6,42,68,0.92))]" />
        <SiteHeader bookNowHref="/contact" />

        <div className="mx-auto flex min-h-[60svh] max-w-7xl flex-col px-6 pb-12 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-extrabold tracking-widest text-white/90">
              FAQ
            </p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/85 sm:text-lg">
              This page will contain your full FAQ content. Tell me your FAQ
              questions and answers and I’ll design it nicely.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-10">
          <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
            COMING NEXT
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Add items like cancellation policy, what to bring, pickup details,
            weather, safety, and booking help.
          </p>
        </div>
      </section>
    </main>
  );
}

