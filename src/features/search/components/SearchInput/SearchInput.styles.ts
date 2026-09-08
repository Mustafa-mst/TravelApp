import { radius, spacing, themed } from "@shared/styles";



export const searchInputStyles = themed(({ colors }) => ({
  filterButton: {
    borderRadius: radius.full,
    backgroundColor: colors.background,
    padding: spacing.sm,
  },
}));
