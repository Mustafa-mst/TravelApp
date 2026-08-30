import { radius, spacing, themed } from "@shared/styles";

export const currencySelectorStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + spacing.xs,
    flexShrink: 0,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  divider: {
    height: 20,
  },
  flag: {
    width: 24,
    height: 17,
    borderRadius: radius.xs,
  },
  flagPlaceholder: {
    width: 24,
    height: 17,
    borderRadius: radius.xs,
    backgroundColor: colors.backgroundSecondary,
  },
}));
