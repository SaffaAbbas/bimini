"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { easeOut, tapScale } from "../lib/motion";

const accent = "text-[color:var(--brand-accent)]";

type ActiveTab = "home" | "tours" | "gallery" | "about" | "contact";

export function SiteHeader({ bookNowHref }: { bookNowHref: string }) {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pathname === "/about") setActiveTab("about");
    else if (pathname === "/contact") setActiveTab("contact");
    else if (pathname === "/") {
      if (!activeTab || activeTab === "about" || activeTab === "contact") {
        setActiveTab("home");
      }
    }
  }, [pathname, activeTab]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    ? "pointer-events-auto bg-white/92 text-slate-900 shadow-sm backdrop-blur-md"
    : "pointer-events-auto bg-transparent text-white";

  const logoClassName = solid
    ? "h-20 w-auto object-contain"
    : "h-30 w-auto object-contain";

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[999]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <motion.div
        className={shellClassName}
        ref={menuRef}
        layout
        transition={{ duration: 0.35, ease: easeOut }}
      >
        <motion.div
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
          layout
        >
          <Link
            href="/"
            className="pointer-events-auto"
            onClick={() => setActiveTab("home")}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              whileTap={tapScale}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-white/30 blur-xl scale-110"
                animate={{ opacity: solid ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <img
                src="/images/bimini.png"
                alt="Bimini Tours & Adventures"
                className={`${logoClassName} brightness-110`}
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
                  onClick={() => {
                    setActiveTab(l.key as ActiveTab);
                    setMobileOpen(false);
                  }}
                  className={
                    solid
                      ? active
                        ? `${base} ${accent}`
                        : `${base} text-slate-700 hover:text-slate-900`
                      : active
                        ? `${base} ${accent}`
                        : `${base} text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] hover:text-white/90`
                  }
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

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={tapScale}
              className="hidden md:block"
            >
              <Link
                href={bookNowHref}
                className="inline-flex rounded-xl bg-[color:var(--brand-accent)] px-4 py-2 font-semibold text-[color:var(--brand-primary-2)] shadow-sm transition-shadow hover:shadow-md"
              >
                Book Now
              </Link>
            </motion.div>

            <motion.button
              type="button"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
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
          </div>
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
                        onClick={() => {
                          setActiveTab(l.key as ActiveTab);
                          setMobileOpen(false);
                        }}
                        className={`block rounded-lg py-3 text-center font-semibold transition-colors ${
                          active
                            ? `${accent} bg-slate-50`
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
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
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-[color:var(--brand-accent)] px-4 py-3 font-semibold text-[color:var(--brand-primary-2)]"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
