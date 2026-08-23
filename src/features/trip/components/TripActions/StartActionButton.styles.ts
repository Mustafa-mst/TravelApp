import { radius, spacing, themed } from "@shared/styles";

export const ICON_SIZE = 20;

export const startActionButtonStyles = themed(({ colors }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.backgroundInverse,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundInverse,
  },
  iconBadge: {
    padding: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.muted,
  },
}));
