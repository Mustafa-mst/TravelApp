import { radius, spacing, themed } from "@shared/styles";

export const PHOTO_BORDER_WIDTH = 2;

export const templateFolderCardStyles = themed(({ colors, shadows }) => ({
  wrapper: {
    alignItems: "center",
    gap: spacing.xs,
  },
  folder: {
    position: "relative",
    ...shadows.level1,
  },
  label: {
    textAlign: "center",
  },
  labelBlock: {
    paddingTop: spacing.md,
  },
  flag: {
    position: "absolute",
    includeFontPadding: false,
  },
  back: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  /**
   * Each photo is placed at its own Figma offset rather than laid out in a row,
   * so the fan keeps its exact overlap. Rendered before the pocket, which then
   * paints over their lower halves.
   */
  photo: {
    position: "absolute",
    borderColor: colors.surface,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: PHOTO_BORDER_WIDTH,
    borderRadius: radius.md,
    overflow: "hidden",
    ...shadows.level1,
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  front: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: colors.surface,
    backgroundColor: colors.folderFront,
  },
}));
