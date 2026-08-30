import { StyleSheet } from "react-native";
import { spacing, themed, type ColorToken } from "@shared/styles";
import type { ListGroupVariant } from "./listGroup.types";

const DISABLED_OPACITY = 0.5;

export const listGroupStyles = themed(({ colors, shadows, elevatedBorder }) => ({
  root: {
    borderCurve: "continuous",
    overflow: "hidden",
  },
  elevated: {
    ...shadows.surface,
    ...elevatedBorder,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.sm + spacing.xs,
  },
  info: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  contentWrapper: {
    overflow: "hidden",
  },
  // Measured off-flow so the wrapper can animate to a known height.
  contentMeasure: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  contentInner: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
}));

export const listGroupVariants: Record<ListGroupVariant, ColorToken> = {
  default: "surface",
  secondary: "surfaceSecondary",
  tertiary: "surfaceTertiary",
  transparent: "transparent",
};
