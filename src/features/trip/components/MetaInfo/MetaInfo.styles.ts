import { spacing, themed } from "@shared/styles";

export const metaInfoStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexShrink: 1,
  },
  text: {
    flexShrink: 1,
  },
}));

export const META_INFO_ICON_SIZE = 16;
