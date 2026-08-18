import { radius, spacing, themed } from "@/shared/styles";

export const bottomSheetListStyles = themed(({ colors }) => ({
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  cardFill: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
}));
