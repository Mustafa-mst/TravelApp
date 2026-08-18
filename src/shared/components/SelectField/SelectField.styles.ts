import { radius, spacing, themed, typography } from "@shared/styles";

export const selectFieldStyles = themed(({ colors }) => ({
  container: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.muted,
  },
  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.muted,
    flex: 1,
    paddingVertical: spacing.md - 2,
    includeFontPadding: false,
  },
  valueFilled: {
    fontWeight: "500",
    color: colors.foreground,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
  },
}));
