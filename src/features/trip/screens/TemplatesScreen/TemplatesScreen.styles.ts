import { radius, spacing, themed } from "@shared/styles";

export const SCREEN_INSET = spacing.md - 4;
export const ADD_TEMPLATE_ICON_SIZE = 24;

const LIST_BOTTOM_INSET = 120;

export const templatesScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: SCREEN_INSET,
    gap: spacing.xxl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContent: {
    gap: spacing.xl,
    paddingBottom: LIST_BOTTOM_INSET,
  },
  columnWrapper: {
    gap: spacing.md,
  },
  addButton: {
    padding: spacing.sm,
    borderRadius: radius.full,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderWidth: 1,
  },
}));
