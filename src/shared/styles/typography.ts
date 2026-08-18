/**
 * Line heights follow the Tailwind scale HeroUI Native builds on:
 * 12/16, 14/20, 16/24, 18/28, 20/28, 24/32, 30/36, 36/40, 48/48.
 */
export const typography = {
  display: {
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 44,
  },
  displaySemiBold: {
    fontSize: 40,
    fontWeight: "600",
    lineHeight: 44,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  h4SemiBold: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 32,
  },
  h5: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 28,
  },
  h6: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
  bodyExtraLargeMedium: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28,
  },
  bodyExtraLarge: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 28,
  },
  bodyLargeSemiBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  bodyLargeMedium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodySemiBold: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },
} as const;

export type TypographyVariant = keyof typeof typography;
