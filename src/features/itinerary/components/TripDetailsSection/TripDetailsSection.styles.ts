import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    padding: 0,
    gap: 0,
    borderRadius: radius.xxl - 8,
    overflow: "hidden",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  nameInput: {
    ...typography.bodyExtraLarge,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg - 4,
    paddingVertical: spacing.md + 4,
    paddingTop: 30,
    includeFontPadding: false,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.lg - 4,
    padding: spacing.lg - 4,
  },
  rowLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flexShrink: 1,
  },
  valueLabel: {
    flexShrink: 1,
  },
});
