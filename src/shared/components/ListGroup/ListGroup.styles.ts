import { radius, spacing, themed, type ColorToken } from "@shared/styles";
import type { ListGroupVariant } from "./listGroup.types";

export const listGroupStyles = themed(() => ({
  root: {
    borderRadius: radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.sm + spacing.xs,
  },
  itemContent: {
    flex: 1,
  },
}));

export const listGroupVariants: Record<ListGroupVariant, ColorToken> = {
  default: "surface",
  secondary: "surfaceSecondary",
  tertiary: "surfaceTertiary",
  transparent: "transparent",
};
