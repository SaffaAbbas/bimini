export type GalleryImage = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
};

/** Curated Bimini moments — used on home, gallery page, and contact. */
export const galleryImages: readonly GalleryImage[] = [
  { src: "/images/img10.jpg", alt: "Boat tour departing from Bimini" },
  { src: "/images/new45.jpg", alt: "Guests enjoying a day on the water in Bimini" },
  { src: "/images/img18.jpg", alt: "Island shoreline at golden hour" },
  { src: "/images/new48.jpg", alt: " Boat tour departing from Bimini" },
  { src: "/images/new49.jpg", alt: "Snorkeling adventure in clear Bahamian water" },
  { src: "/images/img21.webp", alt: "Underwater reef and marine life near Bimini" },
  { src: "/images/beach2.webp", alt: "White-sand beach and calm sea" },
  { src: "/images/img9.jpg", alt: "Fishing charter on open blue water" },
  { src: "/images/new31.jpeg", alt: "Aerial view of Bimini waters" },
  { src: "/images/new41.jpeg", alt: "Sunset over the Bimini horizon" },
  { src: "/images/new35.jpeg", alt: "Underwater reef and marine life near Bimini" },
  { src: "/images/new42.jpeg", alt: "Pristine beach with palm-lined shore" },
] as const;
