import manifest from "./photo-manifest.json";

/** Placement is independent of menu prices; pictured flavors are not inferred. */
export const photographs = manifest;
export type Photograph = (typeof photographs)[keyof typeof photographs];
export const photography = {
  hero: photographs["lavender-garden"],
  heroDetail: photographs["chocolate-brownies"],
  cupcakes: photographs["buttercream-palette"],
  brownies: photographs["brownie-box"],
  cookies: photographs["cooling-rack-cookies"],
  story: photographs["wrapped-with-rah"],
  custom: photographs["blush-blooms"],
  inquiry: photographs["violet-butterflies"],
  contact: photographs["berry-and-ivory"],
  instagram: [
    photographs["sunshine-butterflies"],
    photographs["rose-petal-brownies"],
    photographs["blue-and-ivory"],
    photographs["strawberry-raspberry"],
  ],
};
