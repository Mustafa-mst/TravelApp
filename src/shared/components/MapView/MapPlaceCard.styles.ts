import { radius, themed } from "@shared/styles";

const CARD_WIDTH = 132;
const IMAGE_HEIGHT = 76;

export const mapPlaceCardStyles = themed(({ colors, shadows, elevatedBorder }) => ({
  card: {
    width: CARD_WIDTH,
    padding: 6,
    borderRadius: radius.lg,
    backgroundColor: colors.overlay,
    ...shadows.level3,
    ...elevatedBorder,
  },
  image: {
    height: IMAGE_HEIGHT,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundSecondary,
  },
  imageFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 6,
    marginHorizontal: 2,
  },
}));
