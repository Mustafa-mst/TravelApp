import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";
import type { ListGroupVariant } from "./listGroup.types";

export const styles = StyleSheet.create({
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
});

// `tertiary` shares its value with `background` until the palette gains a
// dedicated surface ramp, so it currently reads close to `default`.
export const listGroupVariants: Record<ListGroupVariant, string> = {
  default: colors.surface,
  secondary: colors.backgroundSecondary,
  tertiary: colors.backgroundTertiary,
  transparent: colors.transparent,
};
