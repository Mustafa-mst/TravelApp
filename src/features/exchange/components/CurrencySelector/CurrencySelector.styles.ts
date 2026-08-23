import { radius, spacing, themed } from "@shared/styles";

const FLAG_HEIGHT = 16;
const FLAG_WIDTH = 22;
const SELECTOR_WIDTH = 108;
const SELECTOR_PADDING = 10;

export const currencySelectorStyles = themed(({ colors }) => ({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: SELECTOR_PADDING,
    paddingHorizontal: SELECTOR_PADDING,
    borderRadius: radius.heroMd,
    backgroundColor: colors.surfaceSecondary,
    width: SELECTOR_WIDTH,
  },
  code: {
    flex: 1,
    textAlign: "center",
  },
  flag: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: radius.xs,
  },
  flagPlaceholder: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: radius.sm,
    backgroundColor: colors.backgroundSecondary,
  },
}));

export const CHEVRON_ICON_SIZE = 14;
