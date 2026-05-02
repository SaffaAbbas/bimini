import { SiteHeader } from "../components/SiteHeader";

export default function FAQPage() {
  return (
    <main className="min-h-[100svh] w-full bg-white text-slate-900">
      <header className="relative isolate min-h-[100svh] overflow-hidden">
        <img
          src="/images/hero3.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <SiteHeader bookNowHref="/contact" />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pb-20 pt-28 lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              FAQ
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white sm:text-lg">
              Tell me your FAQ questions and answers and I’ll design it nicely.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 1440 120"
            className="h-20 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,72 C180,112 360,30 540,72 C720,112 900,30 1080,72 C1260,112 1350,35 1440,72 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
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
