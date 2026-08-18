import { radius, spacing, themed } from "@shared/styles";

export const iconButtonStyles = themed(({ colors }) => ({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  filled: {
    backgroundColor: colors.surfaceSecondary,
  },
  rounded: {
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    padding: spacing.md - 6,
    borderColor: colors.border,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
}));
