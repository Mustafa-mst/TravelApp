import { radius, spacing, themed } from "@shared/styles";

const IMAGE_WIDTH = 135;
const IMAGE_HEIGHT = 110;

export const templateCardStyles = themed((theme) => ({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.level1,
    ...theme.elevatedBorder,
  },
  info: {
    flex: 1,
    gap: spacing.md - 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  chip: {
    backgroundColor: theme.colors.background,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT,
    borderRadius: radius.md,
  },
}));
