/**
 * Social profile URLs — leave empty to hide that icon in the footer.
 * Add real links when accounts are confirmed (no placeholder # hrefs).
 */
export const SOCIAL_LINKS = {
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
} as const;

export type SocialKey = keyof typeof SOCIAL_LINKS;

/** Island areas we tour — links to content on About (SEO-friendly, not dead #). */
export const DESTINATION_LINKS = [
  { label: "North Bimini", href: "/about#north-bimini" },
  { label: "South Bimini", href: "/about#south-bimini" },
  { label: "Sandbars & Cays", href: "/about#sandbars-cays" },
  { label: "Reefs & Wrecks", href: "/about#reefs-wrecks" },
] as const;

export const EXPLORE_LINKS = [
  { label: "Our Tours", href: "/#tours" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Plan your trip", href: "/about#plan-your-trip" },
  { label: "Book a Tour", href: "/contact" },
] as const;
