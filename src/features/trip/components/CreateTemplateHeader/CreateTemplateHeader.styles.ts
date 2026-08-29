import { radius, spacing, themed } from "@shared/styles";

export const CLOSE_ICON_SIZE = 24;

export const createTemplateHeaderStyles = themed(({ colors }) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  iconButton: {
    borderRadius: radius.full,
    padding: spacing.sm,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: "center",
    alignItems: "center",
  },
}));
