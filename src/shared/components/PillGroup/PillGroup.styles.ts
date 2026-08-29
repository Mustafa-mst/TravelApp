import { radius, spacing, themed } from "@shared/styles";

export const pillGroupStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  pillActive: {
    backgroundColor: colors.surface,
  },
  pillBorderless: {
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
  },
  pillPressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.foreground,
  },
  labelActive: {
    color: colors.accent,
  },
}));
