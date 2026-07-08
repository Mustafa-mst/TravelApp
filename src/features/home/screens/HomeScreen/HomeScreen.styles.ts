import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  curved: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
  },
  image: {
    width: "100%",
    aspectRatio: 390 / 240,
    borderBottomEndRadius: 36,
    borderBottomStartRadius: 36,
    overflow: "hidden",
  },
});
