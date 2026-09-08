import { spacing, themed } from "@shared/styles";

export const searchScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderColor:colors.border
  },
  body: {
    flex: 1,
    backgroundColor: colors.surface,
    gap: spacing.md - 4,
  },
}));
