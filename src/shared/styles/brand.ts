/**
 * Raw brand palette, straight from design. Not wired into the light/dark
 * themes yet — read it directly until the tokens are re-pointed at it.
 */
export const brand = {
  nightPurple: "#1A1528",
  travelOrange: "#FF8811",
  crayolaYellow: "#FFCE48",
  peachBlossom: "#FFF8F0",

  background: {
    main: "#FFFFFF",
    light: "#F5F5F5",
    lighter: "#FAFAFA",
    gray: "#E5F2FE",
  },

  text: {
    main: "#1F1F1F",
    light: "#404040",
    lighter: "#9D9D9D",
    inverse: "#FFFFFF",
  },

  border: {
    default: "#D9D9D9",
    light: "#EFEDED",
    inverse: "#2A2537",
  },
} as const;

/** "Circle Of Travel" — pass both to `LinearGradient`. */
export const circleOfTravelGradient = {
  colors: ["#FF9F40", "#FFA851", "#FFC286"],
  locations: [0, 0.51, 1],
} as const;

export type BrandColor = keyof typeof brand;
