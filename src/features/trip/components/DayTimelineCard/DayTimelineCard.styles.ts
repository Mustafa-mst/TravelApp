import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.level1,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  meta: {
    color: colors.textMuted,
  },
  moreButton: {
    padding: spacing.xs,
  },
});
