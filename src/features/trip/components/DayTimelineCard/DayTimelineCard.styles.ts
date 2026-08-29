import { radius, spacing, themed } from "@shared/styles";

export const dayTimelineCardStyles = themed(({ colors, shadows }) => ({
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.level1,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  moreButton: {
    padding: spacing.xs,
  },
}));

export const TIMELINE_NODE_ICON_SIZE = 14;
export const TIMELINE_MORE_ICON_SIZE = 18;
