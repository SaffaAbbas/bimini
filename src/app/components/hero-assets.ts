/** Smaller file for mobile / narrow viewports (production load). */

export const HERO_VIDEO_MOBILE_SRC = "/images/v2.mp4";

export const HERO_VIDEO_MOBILE_1 = "/images/v8.mp4";

export const HERO_VIDEO_MOBILE_2 = "/images/v11.mp4";



/** Full-quality loop for larger screens. */

export const HERO_VIDEO_DESKTOP_1 = "/images/v2.mp4";

export const HERO_VIDEO_DESKTOP_2 = "/images/v8.mp4";

export const HERO_VIDEO_DESKTOP_3 = "/images/v11.mp4";



/** Match Tailwind `md` so tablets get desktop asset. */

export const HERO_VIDEO_MOBILE_MEDIA = "(max-width: 767px)";



/** Seconds each hero clip shows before crossfade (ignores full video length). */

export const HERO_CLIP_DURATION_MS = 4000;



export type HeroSlide =

  | { readonly type: "video"; readonly src: string }

  | {

      readonly type: "image";

      readonly src: string;

      readonly alt: string;

    };



/** Home hero rotation — videos and stills in one sequence. */

export const HERO_SLIDES: readonly HeroSlide[] = [
     {

    type: "image",

    src: "/images/bimini-image.png",

    alt: "Turquoise water and boat tour in Bimini, Bahamas",

    },
     {

    type: "image",

    src: "/images/boat2.png",

    alt: "Turquoise water and boat tour in Bimini, Bahamas",

    },
  

  { type: "video", src: HERO_VIDEO_DESKTOP_1 },

  { type: "video", src: HERO_VIDEO_DESKTOP_2 },

  { type: "video", src: HERO_VIDEO_DESKTOP_3 },

];


