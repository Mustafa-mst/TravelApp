import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

// Gradient underline beneath the active segment: light mint → green → deep green.
export const UNDERLINE_GRADIENT = {
  colors: ["#ECF8EF", "#3CA856", "#276D38"] as const,
  locations: [0, 0.5, 1] as const,
};

export const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  segment: {
    paddingBottom: spacing.sm,
  },
  label: {
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.textPrimary,
  },
  underlineTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  underlineFill: {
    flex: 1,
  },
});
