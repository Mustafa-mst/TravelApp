import { radius, spacing, themed } from "@shared/styles";

const IMAGE_SIZE = 104;
const INFO_GAP = 2;

export const CHEVRON_SIZE = 20;

export const attractionRowStyles = themed(({ colors }) => ({
  root: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceSecondary,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: INFO_GAP,
  },
  // alignItems flex-start: the chevron tracks the first line of the name
  // rather than centring against a title that wrapped to two lines.
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  title: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
}));
