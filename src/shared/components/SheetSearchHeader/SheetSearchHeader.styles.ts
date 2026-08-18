import { radius, spacing, themed } from "@shared/styles";

/** Diameter of the collapsed circular search button; also the fixed height. */
export const COLLAPSED_SIZE = 40;

export const sheetSearchHeaderStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: COLLAPSED_SIZE,
  },
  pill: {
    position: "absolute",
    right: 0,
    height: COLLAPSED_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: COLLAPSED_SIZE,
    paddingLeft: spacing.md,
    color: colors.foreground,
  },
  iconButton: {
    width: COLLAPSED_SIZE,
    height: COLLAPSED_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
}));
