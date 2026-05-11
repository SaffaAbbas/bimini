"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const accent = "text-[color:var(--brand-accent)]";

function useHash() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, [pathname]);

  return hash;
}

function isNavActive(
  label: string,
  pathname: string,
  hash: string,
  isHome: boolean,
): boolean {
  if (label === "About Us") return pathname === "/about";
  if (label === "Contact") return pathname === "/contact";
  if (!isHome) return false;
  if (label === "Tours") return hash === "#tours";
  if (label === "Gallery") return hash === "#gallery";
  if (label === "Home") return hash !== "#tours" && hash !== "#gallery";
  return false;
}

export function SiteHeader({ bookNowHref }: { bookNowHref: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hash = useHash();

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
      if (e.target instanceof Node && !el.contains(e.target))
        setMobileOpen(false);
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
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    [isHome],
  );

  const solid = scrolled || mobileOpen;

  const shellClassName = solid
    ? "pointer-events-auto bg-white/92 text-slate-900 shadow-sm shadow-black/10 backdrop-blur-sm transition-all duration-200"
    : "pointer-events-auto bg-transparent text-white transition-all duration-200";

  const logoClassName = solid
    ? "h-16 w-auto object-contain sm:h-14 lg:h-24"
    : "h-26 w-auto object-contain sm:h-20 lg:h-34";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[999]">
      <div className={shellClassName} ref={menuRef}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 lg:px-8 lg:py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="pointer-events-auto inline-flex items-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-105 motion-safe:active:scale-100"
              aria-label="Go to homepage"
              onClick={() => setMobileOpen(false)}
              prefetch
            >
              <img
                src="/images/bimini.png"
                alt="Bimini Tours & Adventures"
                className={logoClassName}
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = isNavActive(l.label, pathname, hash, isHome);
              const base =
                "pointer-events-auto bg-transparent px-4 py-2 text-base font-semibold transition-all duration-200 rounded-none motion-safe:hover:-translate-y-px";
              const solidCls = active
                ? `${base} ${accent}`
                : `${base} text-slate-700 hover:text-[color:var(--brand-accent)]`;
              const glassCls = active
                ? `${base} ${accent}`
                : `${base} text-white/95 hover:text-[color:var(--brand-accent)]`;
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={solid ? solidCls : glassCls}
                  onClick={() => setMobileOpen(false)}
                  prefetch
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={bookNowHref}
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-[color:var(--brand-accent)] px-4 py-2.5 text-sm font-semibold text-[color:var(--brand-primary-2)] shadow-sm transition-all duration-200 hover:brightness-95 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md active:translate-y-0"
              onClick={() => setMobileOpen(false)}
              prefetch
            >
              Book Now
            </Link>

            <button
              type="button"
              className={
                solid
                  ? "pointer-events-auto inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition-transform duration-200 hover:bg-slate-100 motion-safe:active:scale-95"
                  : "pointer-events-auto inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl text-white transition-transform duration-200 hover:bg-white/10 motion-safe:active:scale-95"
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
                {links.map((l) => {
                  const active = isNavActive(l.label, pathname, hash, isHome);
                  return (
                    <Link
                      key={l.label}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`w-full bg-transparent px-4 py-3 text-base font-semibold transition-all duration-200 motion-safe:active:scale-[0.98] ${
                        active
                          ? accent
                          : "text-slate-800 hover:text-[color:var(--brand-accent)]"
                      }`}
                      prefetch
                      aria-current={active ? "page" : undefined}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>

              <Link
                href={bookNowHref}
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--brand-accent)] px-4 py-3 text-base font-extrabold text-[color:var(--brand-primary-2)] shadow-sm transition-all duration-200 hover:brightness-95 motion-safe:active:scale-[0.98]"
                prefetch
              >
                Book Now
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
