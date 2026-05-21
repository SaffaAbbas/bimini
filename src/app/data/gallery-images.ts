export type GalleryTag = "water" | "beach" | "scenic";

export type GalleryImage = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly tag?: GalleryTag;
};

export const GALLERY_FILTERS = [
  { id: "all" as const, label: "All photos" },
  { id: "water" as const, label: "On the water" },
  { id: "beach" as const, label: "Beaches" },
  { id: "scenic" as const, label: "Sunsets & views" },
];

export type GalleryFilterId = (typeof GALLERY_FILTERS)[number]["id"];
export const galleryImages: readonly GalleryImage[] = [
  { src: "/images/new47.jpg", alt: "Boat tour departing from Bimini", tag: "water" },
  { src: "/images/new45.jpg", alt: "Guests enjoying a day on the water in Bimini", tag: "water" },
  { src: "/images/new46.jpg", alt: "Island shoreline at golden hour", tag: "water" },
  { src: "/images/new48.jpg", alt: "Boat tour departing from Bimini", tag: "water" },
  { src: "/images/new49.jpg", alt: "Snorkeling adventure in clear Bahamian water", tag: "water" },
  { src: "/images/water3.jpeg", alt: "Underwater reef and marine life near Bimini", tag: "water" },
  { src: "/images/new12.jpeg", alt: "White-sand beach and calm sea", tag: "water" },
  { src: "/images/fishing.jpg", alt: "Fishing charter on open blue water", tag: "water" },
  { src: "/images/new33.jpeg", alt: "White-sand beach and calm sea", tag: "beach" },
  { src: "/images/new22.jpeg", alt: "White-sand beach and calm sea", tag: "beach" },
  { src: "/images/new31.jpeg", alt: "Aerial view of Bimini waters", tag: "beach" },
  { src: "/images/new41.jpeg", alt: "Sunset over the Bimini horizon", tag: "beach" },
  { src: "/images/new35.jpeg", alt: "Underwater reef and marine life near Bimini", tag: "water" },
  { src: "/images/new42.jpeg", alt: "Pristine beach with palm-lined shore", tag: "beach" },
  { src: "/images/gall1.jpeg", alt: "Sunset over the Bimini horizon", tag: "water" },
  { src: "/images/gall2.jpeg", alt: "Snorkeling in clear Bahamian water", tag: "water" },
  { src: "/images/gall3.jpeg", alt: "Island beach and calm turquoise sea", tag: "water" },
  { src: "/images/gall4.jpeg", alt: "Boat and guests on a Bimini tour", tag: "water" },
  { src: "/images/gall5.jpeg", alt: "Coastal view of the Bimini islands", tag: "water" },
    { src: "/images/water1.jpeg", alt: "Boat and guests on a Bimini tour", tag: "water" },
  { src: "/images/water.jpeg", alt: "Coastal view of the Bimini islands", tag: "water" },
  { src: "/images/sunset1.jpeg", alt: "Sunset over the Bimini horizon", tag: "scenic" },
  { src: "/images/new17.jpeg", alt: "Sunset over the Bimini horizon", tag: "scenic" },
  { src: "/images/sunset2.jpeg", alt: "Snorkeling in clear Bahamian water", tag: "scenic" },
  { src: "/images/sunset3.jpeg", alt: "Island beach and calm turquoise sea", tag: "scenic" },
  { src: "/images/sunset4.jpeg", alt: "Boat and guests on a Bimini tour", tag: "scenic" },
  { src: "/images/beach1.jpeg", alt: "Coastal view of the Bimini islands", tag: "beach" }
] as const;
