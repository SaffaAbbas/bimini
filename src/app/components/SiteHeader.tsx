"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { btnAccent, btnAccentFullWidth } from "./button-styles";
import { easeOut, tapScale } from "../lib/motion";

const accent = "text-[color:var(--brand-accent)]";

type ActiveTab = "home" | "tours" | "gallery" | "about" | "contact";

function resolveActiveTab(pathname: string, hash: string): ActiveTab {
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname === "/gallery") return "gallery";
  if (pathname.startsWith("/tours")) return "tours";

  if (pathname === "/") {
    const h = hash.replace(/^#/, "").toLowerCase();
    if (h === "tours") return "tours";
    if (h === "gallery") return "gallery";
    return "home";
  }

  return "home";
}

export function SiteHeader({ bookNowHref }: { bookNowHref: string }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const syncHash = useCallback(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, []);

  const setHashInUrl = useCallback((fragment: string | null) => {
    if (typeof window === "undefined") return;
    const next = fragment ? `#${fragment.replace(/^#/, "")}` : "";
    if (window.location.hash !== next) {
      window.history.pushState(null, "", next ? `/${next}` : "/");
    }
    setHash(next);
  }, []);

  /** Next.js same-page hash links scroll but often skip updating location.hash */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      closeMobile();

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) {
        if (href === "/" && pathname === "/") {
          e.preventDefault();
          setHashInUrl(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const fragment = href.slice(hashIndex + 1);
      const targetPath = href.slice(0, hashIndex) || "/";

      if (targetPath === "/" && pathname === "/") {
        e.preventDefault();
        setHashInUrl(fragment);
        document
          .getElementById(fragment)
          ?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (targetPath === "/" && pathname !== "/") {
        setHashInUrl(fragment);
      }
    },
    [pathname, setHashInUrl, closeMobile],
  );

  useEffect(() => {
    syncHash();
    const t1 = window.setTimeout(syncHash, 0);
    const t2 = window.setTimeout(syncHash, 150);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [syncHash, pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const tours = document.getElementById("tours");
    if (!tours) return;

    const onScroll = () => {
      const nearTop = window.scrollY < 80;
      const rect = tours.getBoundingClientRect();
      const inTours =
        rect.top <= 140 && rect.bottom > window.innerHeight * 0.25;

      if (nearTop) {
        if (window.location.hash) {
          window.history.replaceState(null, "", "/");
        }
        setHash("");
        return;
      }
      if (inTours) {
        const current = window.location.hash.replace(/^#/, "");
        if (current !== "tours") {
          window.history.replaceState(null, "", "/#tours");
        }
        setHash("#tours");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const activeTab = useMemo(
    () => resolveActiveTab(pathname, hash),
    [pathname, hash],
  );

  useEffect(() => {
    let isScrolled = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!isScrolled && y > 48) {
        isScrolled = true;
        setScrolled(true);
      } else if (isScrolled && y < 12) {
        isScrolled = false;
        setScrolled(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = useMemo(
    () => [
      { label: "Home", key: "home" as const, href: "/" },
      { label: "Tours", key: "tours" as const, href: "/#tours" },
      { label: "Gallery", key: "gallery" as const, href: "/gallery" },
      { label: "About Us", key: "about" as const, href: "/about" },
      { label: "Contact", key: "contact" as const, href: "/contact" },
    ],
    [],
  );

  const solid = scrolled || mobileOpen;

  const shellClassName = [
    "pointer-events-auto transition-[background-color,box-shadow,color] duration-300 ease-out",
    solid
      ? "bg-white/92 text-slate-900 shadow-sm backdrop-blur-md"
      : "bg-transparent text-white",
  ].join(" ");

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[999]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <div className={shellClassName} ref={menuRef}>
        <motion.div className="mx-auto flex min-h-[5.25rem] max-w-7xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="pointer-events-auto block shrink-0 overflow-hidden"
            onClick={closeMobile}
            aria-label="Bimini Tours & Adventures — Home"
          >
            <motion.div
              className={`relative flex items-center ${
                solid ? "h-14 sm:h-20" : "h-[5.25rem] sm:h-[7.75rem]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={tapScale}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <img
                src="/images/bimini.png"
                alt=""
                className={`w-auto origin-left object-contain object-left transition-[height,filter] duration-300 ease-out ${
                  solid
                    ? "h-14 max-w-[min(52vw,11rem)] sm:h-20 sm:max-w-none"
                    : "h-[5rem] max-w-[min(68vw,16rem)] brightness-0 invert  sm:h-[7.5rem] sm:max-w-none"
                }`}
                width={160}
                height={80}
              />
            </motion.div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = activeTab === l.key;
              const base =
                "pointer-events-auto relative px-4 py-2 text-base font-semibold transition-colors duration-200";

              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={
                    solid
                      ? active
                        ? `${base} ${accent}`
                        : `${base} text-slate-700 hover:text-slate-900`
                      : active
                        ? `${base} ${accent}`
                        : `${base} text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] hover:text-white/90`
                  }
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[color:var(--brand-accent)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <motion.div className="flex items-center gap-3">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={tapScale}
              className="hidden md:block"
            >
              <Link href={bookNowHref} className={btnAccent}>
                Book Now
              </Link>
            </motion.div>

            <motion.button
              type="button"
              className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg touch-manipulation md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              whileTap={tapScale}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              className="overflow-hidden border-t border-slate-200/80 bg-white text-slate-900 md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <motion.nav
                className="px-4 py-2"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                  },
                }}
              >
                {links.map((l) => {
                  const active = activeTab === l.key;
                  return (
                    <motion.div
                      key={l.label}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={(e) => handleNavClick(e, l.href)}
                        className={`block rounded-lg py-3 text-center font-semibold transition-colors ${
                          active
                            ? `${accent} bg-slate-50`
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="px-2 pb-4 pt-2"
                >
                  <Link
                    href={bookNowHref}
                    onClick={closeMobile}
                    className={btnAccentFullWidth}
                  >
                    Book Now
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
