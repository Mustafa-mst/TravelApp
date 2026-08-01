import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
  },
  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: radius.lg - 2,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  fieldWrapperError: {
    borderColor: colors.danger,
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.textTertiary,
    flex: 1,
    paddingVertical: spacing.md - 2,
    includeFontPadding: false,
  },
  valueFilled: {
    fontWeight: "500",
    color: colors.text,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
  },
});
