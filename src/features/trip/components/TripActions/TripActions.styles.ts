import { radius, spacing, themed } from "@shared/styles";

export const ACTION_ICON_SIZE = 24;

const ACTION_GAP = spacing.md - 4;
const BADGE_PADDING_HORIZONTAL = 10;
const BADGE_PADDING_VERTICAL = 4;

export const tripActionsStyles = themed(({ colors, shadows }) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ACTION_GAP,
  },
  actionButton: {
    padding: ACTION_GAP,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    ...shadows.level1,
  },
  statusBadge: {
    paddingHorizontal: BADGE_PADDING_HORIZONTAL,
    paddingVertical: BADGE_PADDING_VERTICAL,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
  },
}));
