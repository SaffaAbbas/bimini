const social = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <path d="M13.5 12H12v8H8v-8H6v-3.4h2V6.4C8 4.1 9.4 3 11.6 3c1 0 2 .1 2 .1v2.8h-1.4c-1.1 0-1.3.5-1.3 1.2v1.5H14L13.5 12Z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z" />
        <path d="M12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
        <path d="M18.3 6.5a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <>
        <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8Z" />
        <path d="M10.2 15.2V8.8L15.7 12l-5.5 3.2Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    svg: (
      <path d="M16.5 3c.4 2.7 2.2 4.6 4.8 4.9V11c-1.8 0-3.2-.6-4.3-1.6v6.2c0 3.4-2.5 6.2-6.5 6.2-3.6 0-6.5-2.8-6.5-6.2 0-3.5 3-6.5 7.4-6.1v3.3c-2.2-.3-3.9 1-3.9 2.8 0 1.7 1.4 3.1 3.1 3.1 2.1 0 3.4-1.3 3.4-3.8V3h2.5Z" />
    ),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]">
            FOLLOW US ON SOCIAL
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
                aria-label={s.label}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  {s.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 text-center lg:grid-cols-12 lg:text-left">
          <div className="lg:col-span-4 flex -mt-6 justify-center lg:justify-start">
            <img
              src="/images/bimini.png"
              alt="Bimini Tours & Adventures"
              className="h-28 w-auto object-contain sm:h-32 lg:h-40"
            />
          </div>

          <div className="grid justify-items-center gap-10 sm:grid-cols-3 lg:col-span-8 lg:justify-items-stretch">
            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Destinations
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <a className="hover:text-slate-900" href="#">
                    North Bimini
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="#">
                    South Bimini
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="#">
                    Sandbars & Cays
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="#">
                    Reefs & Wrecks
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-extrabold text-slate-900">About Us</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <a className="hover:text-slate-900" href="/#tours">
                    Our Tours
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="/contact">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="/#gallery">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Important Links
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <a className="hover:text-slate-900" href="/faq">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="/terms-and-conditions">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="/refund-policy">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-slate-500">
            © {new Date().getFullYear()} Bimini Tours & Adventures. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {["VISA", "AMEX", "MASTERCARD", "DISCOVER"].map((x) => (
              <span
                key={x}
                className="inline-flex items-center justify-center rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold tracking-widest text-slate-700 ring-1 ring-slate-200"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

