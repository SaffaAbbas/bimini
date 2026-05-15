"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const accent = "text-[color:var(--brand-accent)]";

type ActiveTab = "home" | "tours" | "gallery" | "about" | "contact";

export function SiteHeader({ bookNowHref }: { bookNowHref: string }) {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔥 SINGLE SOURCE FOR NAV ACTIVE
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  const menuRef = useRef<HTMLDivElement | null>(null);

  // sync route-based pages
  useEffect(() => {
    if (pathname === "/about") setActiveTab("about");
    else if (pathname === "/contact") setActiveTab("contact");
    else if (pathname === "/") {
      // default home section
      if (!activeTab || activeTab === "about" || activeTab === "contact") {
        setActiveTab("home");
      }
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(
    () => [
      { label: "Home", key: "home", href: "/" },
      { label: "Tours", key: "tours", href: "/#tours" },
      { label: "Gallery", key: "gallery", href: "/#gallery" },
      { label: "About Us", key: "about", href: "/about" },
      { label: "Contact", key: "contact", href: "/contact" },
    ],
    [],
  );

  const solid = scrolled || mobileOpen;

  const shellClassName = solid
    ? "pointer-events-auto bg-white/92 text-slate-900 shadow-sm backdrop-blur-sm"
    : "pointer-events-auto bg-transparent text-white";

  const logoClassName = solid
    ? "h-20 w-auto object-contain"
    : "h-30 w-auto object-contain";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[999]">
      <div className={shellClassName} ref={menuRef}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* LOGO */}
          <Link
            href="/"
            className="pointer-events-auto"
            onClick={() => setActiveTab("home")}
          >
            <div className="relative">
              {/* soft halo background */}
              <div className="absolute inset-0 -z-10 rounded-full bg-white/30 blur-xl scale-110" />

              <img
                src="/images/bimini.png"
                className={`${logoClassName} brightness-110`}
              />
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex gap-2">
            {links.map((l) => {
              const active = activeTab === l.key;

              const base =
                "pointer-events-auto px-4 py-2 text-base font-semibold transition-all";

              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => {
                    setActiveTab(l.key as ActiveTab);
                    setMobileOpen(false);
                  }}
                  className={
                    solid
                      ? active
                        ? `${base} ${accent}`
                        : `${base} text-slate-700`
                      : active
                        ? `${base} ${accent}`
                        : `${base} text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]`
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* BUTTON */}
          <Link
            href={bookNowHref}
            className="hidden md:inline-flex bg-[color:var(--brand-accent)] px-4 py-2 rounded-xl font-semibold"
          >
            Book Now
          </Link>
        </div>

        {/* MOBILE */}
        {mobileOpen && (
          <div className="md:hidden bg-white text-black">
            {links.map((l) => {
              const active = activeTab === l.key;

              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => {
                    setActiveTab(l.key as ActiveTab);
                    setMobileOpen(false);
                  }}
                  className={`block py-3 text-center font-semibold ${
                    active ? accent : ""
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
