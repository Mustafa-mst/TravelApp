import { spacing, themed } from "@shared/styles";

export const bottomTabBarStyles = themed(({ colors }) => ({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: colors.tabBarBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs / 2,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  pressed: {
    opacity: 0.6,
  },
}));
