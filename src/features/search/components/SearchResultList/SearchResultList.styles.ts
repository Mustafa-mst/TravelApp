import { radius, spacing, themed } from "@shared/styles";

export const RESULT_ROW_ICON_SIZE = 18;

const FLAG_WIDTH = 24;
const FLAG_HEIGHT = 18;
const ROW_VERTICAL_PADDING = spacing.md - 4;

export const searchResultListStyles = themed(({ colors }) => ({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    overflow: "hidden",
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: spacing.sm,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: ROW_VERTICAL_PADDING,
  },
  itemContainer: {
    paddingVertical: ROW_VERTICAL_PADDING,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  border: { height: 1, width: "100%", backgroundColor: colors.border },
  resultInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexShrink: 1,
  },
  flag: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: radius.sm - 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
}));
