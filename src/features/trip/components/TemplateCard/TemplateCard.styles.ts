
import { brand, radius, spacing, themed } from "@shared/styles";

const IMAGE_ASPECT_RATIO = 16 / 6;

export const templateCardStyles = themed((theme) => ({
  card: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius["3xl"],
    overflow: "hidden",
    borderWidth: 1,
    borderColor: brand.border.default,
    backgroundColor: theme.colors.surface,
  },
  // Composed after `elevatedBorder`, which already sets both properties.
  cardActive: {
    borderColor: brand.crayolaYellow,
  },
  info: {
    flex: 1,
    gap: spacing.md - 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  chip: {
    backgroundColor: brand.background.light,
    borderRadius: radius.lg - 4,
    padding: spacing.xs,
  },
  image: {
    marginTop: -spacing.md,
    marginHorizontal: -spacing.md,
    aspectRatio: IMAGE_ASPECT_RATIO,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  action: {
    padding: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: brand.crayolaYellow,
  },
}));
