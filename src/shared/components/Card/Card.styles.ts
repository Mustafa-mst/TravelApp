import { radius, spacing, themed, type ColorToken } from "@shared/styles";
import type { CardVariant } from "./card.types";

export const cardStyles = themed(() => ({
  root: {
    borderRadius: radius.xl,
    borderCurve: "continuous",
    padding: spacing.md,
    gap: spacing.sm,
  },
  // Body expands to fill whatever Header and Footer leave behind.
  body: {
    flex: 1,
  },
}));

export const cardVariants: Record<CardVariant, ColorToken> = {
  default: "surface",
  secondary: "surfaceSecondary",
  tertiary: "surfaceTertiary",
  transparent: "transparent",
};
