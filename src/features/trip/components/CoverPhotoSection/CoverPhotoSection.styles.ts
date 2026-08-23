import { radius, spacing, themed } from "@shared/styles";

const SECTION_GAP = spacing.md - 4;
const TILE_WIDTH = 140;
const TILE_ASPECT_RATIO = 1.5;
const TILE_UNSELECTED_OPACITY = 0.6;

export const coverPhotoSectionStyles = themed(({ colors }) => ({
  container: {
    gap: SECTION_GAP,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loading: {
    alignSelf: "flex-start",
    padding: spacing.sm,
  },
  list: {
    flexDirection: "row",
    gap: SECTION_GAP,
  },
  tile: {
    width: TILE_WIDTH,
    aspectRatio: TILE_ASPECT_RATIO,
    borderRadius: radius.md,
    overflow: "hidden",
    borderWidth: 1,
  },
  tileSelected: {
    borderColor: colors.accent,
  },
  tileUnselected: {
    borderColor: colors.transparent,
    opacity: TILE_UNSELECTED_OPACITY,
  },
  tileImage: {
    flex: 1,
  },
}));
