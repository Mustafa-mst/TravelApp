import { radius, spacing, themed } from "@shared/styles";

const PHOTO_SIZE = 96;

export const tripDayCardStyles = themed((theme) => ({
  flex: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...theme.shadows.level1,
    ...theme.elevatedBorder,
  },
  emptyCard: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  emptyBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  emptyIcon: {
    fontSize: 22,
  },
  emptyText: {
    flex: 1,
    gap: 2,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: radius.full,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xs,
  },
  badgeActive: {
    borderColor: theme.colors.accent,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chip: {
    backgroundColor: theme.colors.background,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  photoColumn: {
    width: PHOTO_SIZE,
    alignItems: "center",
    gap: spacing.xs,
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: radius.lg,
  },
}));
