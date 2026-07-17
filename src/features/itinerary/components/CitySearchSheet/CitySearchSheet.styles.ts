import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingVertical: spacing.md - 2,
    paddingRight: spacing.md,
  },
  pinContainer: {
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.sm - 2,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  rowLabel: {
    flexShrink: 1,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: spacing.lg,
  },
});
