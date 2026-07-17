import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    padding: 0,
    gap: 0,
    overflow: "hidden",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md,
  },
  nameInput: {
    ...typography.body,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    includeFontPadding: false,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  valueGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexShrink: 1,
    paddingVertical: spacing.sm + 4,
  },
  valueLabel: {
    flexShrink: 1,
  },
});
