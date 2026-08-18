import { spacing, themed } from "@shared/styles";

export const listItemStyles = themed(({ colors }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  subtitle: {
    color: colors.muted,
  },
}));
