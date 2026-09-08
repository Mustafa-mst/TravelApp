import { radius, spacing, themed } from "@shared/styles";

export const searchResultListStyles = themed(({ colors }) => ({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
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
    paddingTop: spacing.md - 4,
    paddingBottom: 120,
  },
  itemContainer: {
    paddingVertical: spacing.md - 4,
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
    width: 28,
    height: 20,
    borderRadius: radius.sm - 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
}));
