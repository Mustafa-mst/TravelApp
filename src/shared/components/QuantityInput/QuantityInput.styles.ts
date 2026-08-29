import { radius, spacing, themed, typography } from "@shared/styles";

export const quantityInputStyles = themed(({ colors }) => ({
  container: {
    gap: spacing.md - 4,
  },
  label: {
    ...typography.bodyLargeMedium,
    color: colors.foreground,
  },
  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg - 2,
    height: 47.3,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
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
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 16,
    fontWeight: "500",
    includeFontPadding: false,
    color: colors.accentForeground,
    textAlign: "center",
  },
}));
