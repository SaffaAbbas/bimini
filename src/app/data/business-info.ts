/** Central business facts — update URLs when live profiles are confirmed. */

export const BUSINESS = {
  name: "Bimini Tours & Adventures",
  phoneDisplay: "(242) 826-TOUR (8687)",
  phoneTel: "+12428268687",
  email: "bookings@toursbimini.com",
  website: "https://www.toursbimini.com",
  whatsapp: "12428268687",
  whatsappDisplay: "+1 (242) 826-8687",
} as const;

export const MEETING_POINT = {
  title: "Main meeting area",
  address: "Alice Town, North Bimini, Bahamas",
  detail:
    "Exact dock or pickup point is confirmed in your booking email—many tours start near Alice Town / marina areas on North Bimini.",
  /** Google Maps embed (no API key). Update if you prefer a pinned marina. */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Alice+Town,+North+Bimini,+Bahamas&hl=en&z=14&output=embed",
  mapsLink: "https://maps.google.com/?q=Alice+Town,+Bimini,+Bahamas",
} as const;

/** Leave empty to hide badge links until you add real profile URLs. */
export const REVIEW_LINKS = {
  google: "",
  tripadvisor: "",
} as const;

export const OPERATING_INFO = {
  hours: "Daily 8:00 AM – 6:00 PM (Bahamas time)",
  season:
    "We operate year-round. Peak season is typically November through April. Tours are weather permitting.",
  hurricane:
    "During hurricane season (June–November), schedules may change with short notice. We reschedule or refund per our weather policy when the captain cancels.",
} as const;
