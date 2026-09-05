import { spacing, themed } from "@shared/styles";

export const LOCAL_TIME_ICON_SIZE = 32;

export const countryLocalTimeStyles = themed(() => ({
  panel: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md - 4,
    paddingVertical: spacing.sm,
  },
  clockRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.xs,
  },
}));
