"use client";

import { motion } from "framer-motion";
import { ACCEPTED_CARD_BADGES } from "../data/payment-methods";
import { BUSINESS } from "../data/business-info";
import {
  DESTINATION_LINKS,
  EXPLORE_LINKS,
  SOCIAL_LINKS,
} from "../data/site-links";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const socialLinkClass =
  "inline-flex h-12 w-12 items-center justify-center overflow-visible rounded-full bg-white shadow-md ring-1 ring-black/5 transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]";

function IconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0"
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0"
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="footerInsta" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDC830" />
          <stop offset="22%" stopColor="#F77737" />
          <stop offset="45%" stopColor="#E4405F" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footerInsta)"
        d="M12 2.2c3.2 0 3.6 0 4.9.06 1.3.06 2.1.25 2.8.55.7.28 1.3.65 1.9 1.2.55.55.92 1.18 1.2 1.9.3.7.48 1.5.54 2.8.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.3-.25 2.1-.55 2.8-.28.7-.65 1.3-1.2 1.9-.55.55-1.18.92-1.9 1.2-.7.3-1.5.48-2.8.54-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.3-.06-2.1-.25-2.8-.55-.7-.28-1.3-.65-1.9-1.2-.55-.55-.92-1.18-1.2-1.9-.3-.7-.48-1.5-.54-2.8-.06-1.3-.07-1.7-.07-4.9s0-3.6.07-4.9c.06-1.3.25-2.1.55-2.8.28-.7.65-1.3 1.2-1.9.55-.55 1.18-.92 1.9-1.2.7-.3 1.5-.48 2.8-.54 1.3-.06 1.7-.07 4.9-.07zm0 1.8c-3.1 0-3.5 0-4.7.06-1.1.05-1.6.2-2 .35-.5.2-.9.44-1.3.88-.44.44-.68.8-.88 1.3-.15.4-.3.9-.35 2-.06 1.2-.06 1.6-.06 4.7s0 3.5.06 4.7c.05 1.1.2 1.6.35 2 .2.5.44.9.88 1.3.44.44.8.68 1.3.88.4.15.9.3 2 .35 1.2.06 1.6.06 4.7.06s3.5 0 4.7-.06c1.1-.05 1.6-.2 2-.35.5-.2.9-.44 1.3-.88.44-.44.68-.8.88-1.3.15-.4.3-.9.35-2 .06-1.2.06-1.6.06-4.7s0-3.5-.06-4.7c-.05-1.1-.2-1.6-.35-2-.2-.5-.44-.9-.88-1.3-.44-.44-.8-.68-1.3-.88-.4-.15-.9-.3-2-.35-1.2-.06-1.6-.06-4.7-.06zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 1.9a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.4-3.4a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"
      />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0"
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <path
        fill="#FF0000"
        d="M23.5 6.2A3 3 0 0 0 21.4 4C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8z"
      />
      <path fill="#fff" d="M9.8 15.5V8.5l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function IconTikTok() {
  const d =
    "M16.5 3c.4 2.7 2.2 4.6 4.8 4.9V11c-1.8 0-3.2-.6-4.3-1.6v6.2c0 3.4-2.5 6.2-6.5 6.2-3.6 0-6.5-2.8-6.5-6.2 0-3.5 3-6.5 7.4-6.1v3.3c-2.2-.3-3.9 1-3.9 2.8 0 1.7 1.4 3.1 3.1 3.1 2.1 0 3.4-1.3 3.4-3.8V3h2.5Z";
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0"
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <path fill="#25F4EE" d={d} transform="translate(-0.4 -0.35)" />
      <path fill="#FE2C55" d={d} transform="translate(0.4 0.35)" />
      <path fill="#000000" d={d} />
    </svg>
  );
}

const socialPlatforms = [
  { key: "facebook" as const, label: "Facebook", Icon: IconFacebook },
  { key: "instagram" as const, label: "Instagram", Icon: IconInstagram },
  { key: "youtube" as const, label: "YouTube", Icon: IconYouTube },
  { key: "tiktok" as const, label: "TikTok", Icon: IconTikTok },
];

const activeSocial = socialPlatforms.filter((s) => {
  const href = SOCIAL_LINKS[s.key]?.trim();
  return Boolean(href);
});

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-white text-slate-900">
      <motion.div
        className="mx-auto max-w-7xl px-6 py-12 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {activeSocial.length > 0 ? (
          <div className="text-center">
            <motion.p
              variants={fadeUp}
              className="text-sm font-extrabold tracking-widest text-[color:var(--brand-primary)]"
            >
              FOLLOW US ON SOCIAL
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-4 flex items-center justify-center gap-4"
            >
              {activeSocial.map((s, i) => {
                const Icon = s.Icon;
                const href = SOCIAL_LINKS[s.key].trim();
                return (
                  <motion.a
                    key={s.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        ) : null}

        <motion.div
          className={`grid gap-10 text-center lg:grid-cols-12 lg:text-left ${activeSocial.length > 0 ? "mt-12" : ""}`}
        >
          <motion.div
            variants={fadeUp}
            className="-mt-6 flex justify-center lg:col-span-3 lg:justify-start"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/images/bimini.png"
                alt="Bimini Tours & Adventures"
                className="h-28 w-auto object-contain sm:h-32 lg:h-40"
              />
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-9 lg:justify-items-stretch"
          >
            <motion.div variants={fadeUp}>
              <p className="text-sm font-extrabold text-slate-900">
                Destinations
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {DESTINATION_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      className="inline-block transition-colors duration-200 hover:text-slate-900"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-sm font-extrabold text-slate-900">Explore</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {EXPLORE_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      className="inline-block transition-colors duration-200 hover:text-slate-900"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-sm font-extrabold text-slate-900">About Us</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/about"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/#tours"
                  >
                    Our Tours
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/contact"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/gallery"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-sm font-extrabold text-slate-900">
                Important Links
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/faq"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/terms-and-conditions"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block transition-colors duration-200 hover:text-slate-900"
                    href="/refund-policy"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs font-semibold text-slate-500">
            © {new Date().getFullYear()} Bimini Tours & Adventures. All rights
            reserved.
          </p>
          <motion.div
            className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-end"
            variants={staggerContainer}
          >
            <div className="flex max-w-md flex-col items-center gap-2 sm:items-end">
              <motion.div
                className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3"
                aria-label="Payment methods we accept"
              >
                {ACCEPTED_CARD_BADGES.map((x, i) => (
                  <motion.span
                    key={x.src}
                    className="inline-flex items-center justify-center px-1.5 py-0.5"
                    title={x.alt}
                    variants={fadeUp}
                    whileHover={{ scale: 1.12 }}
                  >
                    <img
                      src={x.src}
                      alt={x.alt}
                      className="h-6 w-auto object-contain sm:h-7"
                      loading="lazy"
                    />
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
