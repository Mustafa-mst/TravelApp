import { radius, spacing, themed } from "@shared/styles";

export const backButtonStyles = themed(({ colors }) => ({
  button: {
    position: "absolute",
    left: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    padding: spacing.sm,
  },
}));
