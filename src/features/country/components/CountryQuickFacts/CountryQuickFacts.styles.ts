import { spacing, themed } from "@shared/styles";

export const DIVIDER_MARGIN = 0;

export const QUICK_FACT_ICON_SIZE = 24;

export const countryQuickFactsStyles = themed(() => ({
  panel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.sm,
  },
  fact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  values: {
    gap: 2,
  },
  divider: {
    alignSelf: "stretch",
    paddingVertical: spacing.sm,
  },
}));
