import Link from "next/link";

/** Minimal top bar for checkout: back to tour, centered logo → home. No main nav. */
export function CheckoutPageHeader({ tourSlug }: { tourSlug: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white shadow-sm">
      <div className="relative mx-auto flex h-[3.75rem] max-w-7xl items-center justify-center px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href={`/tours/${tourSlug}`}
          className="absolute left-4 text-sm font-semibold text-slate-600 underline-offset-4 transition hover:text-[color:var(--brand-primary)] hover:underline sm:left-6"
        >
          <span aria-hidden>← </span>
          Back
        </Link>
        <Link
          href="/"
          className="inline-flex shrink-0 items-center py-1 motion-safe:transition-opacity hover:opacity-90"
          aria-label="Bimini Tours & Adventures — Home"
        >
          <img
            src="/images/bimini.png"
            alt="Bimini Tours & Adventures"
            className="h-11 w-auto object-contain sm:h-[3.25rem]"
            width={200}
            height={64}
          />
        </Link>
      </div>
    </header>
  );
}
