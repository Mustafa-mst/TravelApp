import { radius, spacing, themed } from "@shared/styles";

const HERO_IMAGE_FRAME_WIDTH = 4;
const HERO_IMAGE_OVERLAP = -spacing.md - 6;

export const homeHeaderStyles = themed(({ colors, shadows }) => ({
  container: {},
  searchBar: {
    padding: spacing.md,
    backgroundColor: colors.fieldBackground,
    borderRadius: radius.full,
    ...shadows.level1,
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    paddingTop: spacing.xl,
  },
  tombRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: -spacing.md,
    marginHorizontal: spacing.md - 2,
  },
  tombImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.md,
    borderWidth: HERO_IMAGE_FRAME_WIDTH,
    borderColor: colors.surface,
    marginLeft: HERO_IMAGE_OVERLAP,
  },
  tombImageFirst: {
    marginLeft: 0,
  },
}));
