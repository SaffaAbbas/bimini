/** Smaller clips for narrow viewports (faster load on cellular). */
export const HERO_VIDEO_MOBILE_1 = "/images/v2.mp4";
export const HERO_VIDEO_MOBILE_2 = "/images/v8.mp4";
export const HERO_VIDEO_MOBILE_3 = "/images/v11.mp4";

/** Full-quality clips for tablet and desktop. */
export const HERO_VIDEO_DESKTOP_1 = "/images/v2.mp4";
export const HERO_VIDEO_DESKTOP_2 = "/images/v8.mp4";
export const HERO_VIDEO_DESKTOP_3 = "/images/v11.mp4";

/** Match Tailwind `md` — phones use mobile assets / framing. */
export const HERO_VIDEO_MOBILE_MEDIA = "(max-width: 767px)";

/** Seconds each hero clip shows before crossfade (ignores full video length). */
export const HERO_CLIP_DURATION_MS = 4000;

export type HeroVideoSlide = {
  readonly type: "video";
  readonly src: string;
  readonly srcMobile?: string;
};

export type HeroImageSlide = {
  readonly type: "image";
  readonly src: string;
  readonly srcMobile?: string;
  readonly alt: string;
  /** CSS object-position on md+ (e.g. `center 40%`). */
  readonly objectPosition?: string;
  /** CSS object-position on phones. */
  readonly objectPositionMobile?: string;
};

export type HeroSlide = HeroVideoSlide | HeroImageSlide;

export function isHeroImageSlide(
  slide: HeroSlide,
): slide is HeroImageSlide {
  return slide.type === "image";
}

export function resolveHeroImageSrc(
  slide: HeroImageSlide,
  isMobile: boolean,
): string {
  return isMobile && slide.srcMobile ? slide.srcMobile : slide.src;
}

export function resolveHeroObjectPosition(
  slide: HeroImageSlide,
  isMobile: boolean,
): string | undefined {
  if (isMobile) return slide.objectPositionMobile ?? slide.objectPosition;
  return slide.objectPosition;
}

/** Home hero rotation — videos and stills in one sequence. */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    type: "image",
    src: "/images/bimini-image.png",
    alt: "Turquoise water and boat tour in Bimini, Bahamas",
    objectPosition: "center center",
    objectPositionMobile: "center 35%",
  },
  {
    type: "image",
    src: "/images/boat2.png",
    alt: "Boat tour guests on the water in Bimini",
    objectPosition: "center center",
    objectPositionMobile: "center 40%",
  },
  {
    type: "video",
    src: HERO_VIDEO_DESKTOP_1,
    srcMobile: HERO_VIDEO_MOBILE_1,
  },
  {
    type: "video",
    src: HERO_VIDEO_DESKTOP_2,
    srcMobile: HERO_VIDEO_MOBILE_2,
  },
  {
    type: "video",
    src: HERO_VIDEO_DESKTOP_3,
    srcMobile: HERO_VIDEO_MOBILE_3,
  },
];
