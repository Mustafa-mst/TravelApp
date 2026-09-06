import { radius, spacing, themed } from "@shared/styles";

export const countryLocalTimeStyles = themed(() => ({
  panel: {
    flexDirection: "row",
    alignItems: "center",
    width: 135,
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    borderCurve: "continuous",
  },
  timeBlock: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  clockRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.xs,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    gap: spacing.xs,
  },
  city: {
    flexShrink: 1,
  },
}));
