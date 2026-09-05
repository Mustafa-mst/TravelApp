import { spacing, themed, themedValue, type ColorToken } from "@shared/styles";
import type { CardVariant } from "./card.types";

export const cardStyles = themed(() => ({
  root: {
    borderCurve: "continuous",
    padding: spacing.md,
    gap: spacing.sm,
  },
  // Body expands to fill whatever Header and Footer leave behind.
  body: {
    flex: 1,
  },
}));

export const cardShadows = themedValue(({ shadows }) => shadows);

export const cardVariants: Record<CardVariant, ColorToken> = {
  default: "surface",
  secondary: "surfaceSecondary",
  tertiary: "surfaceTertiary",
  transparent: "transparent",
};
