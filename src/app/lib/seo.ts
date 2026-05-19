import type { Metadata } from "next";

export const SITE_NAME = "Bimini Tours & Adventures";
export const SITE_URL = "https://www.toursbimini.com";

/** Homepage-only title (no template suffix). */
export const HOME_TITLE =
  "Bimini Tours & Adventures — Island Tours in the Bahamas";

const DEFAULT_DESCRIPTION =
  "Discover snorkeling, island tours, fishing charters, eco-adventures, and unforgettable experiences in Bimini, Bahamas.";

/** Per-route metadata — unique title (via layout template) and description for SEO. */
export function pageMeta(segment: string, description: string): Metadata {
  const fullTitle = `${segment} | ${SITE_NAME}`;

  return {
    title: segment,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const homeMetadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description:
    "Snorkeling, fishing charters, culture tours, and private adventures in Bimini, Bahamas. Local guides, clear pricing, and easy booking inquiries.",
  openGraph: {
    title: HOME_TITLE,
    description:
      "Snorkeling, fishing charters, culture tours, and private adventures in Bimini, Bahamas.",
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description:
      "Snorkeling, fishing charters, culture tours, and private adventures in Bimini, Bahamas.",
  },
};

/** Tour detail / checkout pages. */
export function tourPageMeta(
  tourTitle: string,
  description: string,
): Metadata {
  const fullTitle = `${tourTitle} | ${SITE_NAME}`;

  return {
    title: tourTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export { DEFAULT_DESCRIPTION };
