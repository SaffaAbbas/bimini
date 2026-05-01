"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function SiteHeader({
  bookNowHref,
}: {
  bookNowHref: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      const el = menuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  const links = useMemo(
    () => [
      { label: "Home", href: isHome ? "#" : "/" },
      { label: "Tours", href: isHome ? "#tours" : "/#tours" },
      { label: "Gallery", href: isHome ? "#gallery" : "/#gallery" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    [isHome],
  );

  const shellClassName = scrolled
    ? "pointer-events-auto transition-all duration-200 bg-white/92 text-slate-900 shadow-sm shadow-black/10"
    : "pointer-events-auto transition-all duration-200 bg-transparent text-white";

  const navLinkClass = scrolled
    ? "rounded-full px-4 py-2 text-base font-semibold transition-colors text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    : "rounded-full px-4 py-2 text-base font-semibold transition-colors text-white/95 hover:bg-white/10 hover:text-white";

  const logoClassName = scrolled
    ? "h-12 w-auto object-contain sm:h-14 lg:h-16"
    : "h-16 w-auto object-contain sm:h-20 lg:h-24";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[999]">
      <div className={shellClassName} ref={menuRef}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 lg:px-8 lg:py-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/bimini.png"
              alt="Bimini Tours & Adventures"
              className={logoClassName}
            />
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={navLinkClass}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={bookNowHref}
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-[color:var(--brand-accent)] px-4 py-2.5 text-sm font-semibold text-[color:var(--brand-primary-2)] transition-colors hover:brightness-95"
            >
              Book Now
            </a>

            <button
              type="button"
              className={
                scrolled
                  ? "pointer-events-auto inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl text-slate-800 hover:bg-slate-100"
                  : "pointer-events-auto inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl text-white hover:bg-white/10"
              }
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="pointer-events-auto md:hidden border-t border-black/10 bg-white/95 text-slate-900 backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
              <nav className="flex flex-col items-center gap-1 text-center">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="w-full rounded-xl px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <a
                href={bookNowHref}
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--brand-accent)] px-4 py-3 text-base font-extrabold text-[color:var(--brand-primary-2)] transition-colors hover:brightness-95"
              >
                Book Now
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

