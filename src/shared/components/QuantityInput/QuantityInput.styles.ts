import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md - 4,
  },
  label: {
    ...typography.bodyLargeMedium,
    color: colors.textPrimary,
  },
  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: radius.lg - 2,
    height: 47.3,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  countBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 16,
    fontWeight: "500",
    includeFontPadding: false,
    color: colors.white,
    textAlign: "center",
  },
});
