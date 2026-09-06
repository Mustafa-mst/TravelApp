import { radius, spacing, themed } from "@shared/styles";

export const ESSENTIALS_SHEET_SNAP_POINTS = ["100%"];

export const ROW_ICON_SIZE = 18;

const ICON_CIRCLE_SIZE = 36;

export const essentialsSheetStyles = themed(({ colors }) => ({
  content: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  group: {
    gap: spacing.sm,
  },
  groupTitle: {
    paddingHorizontal: spacing.xs,
    letterSpacing: 0.6,
  },
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  iconCircle: {
    width: ICON_CIRCLE_SIZE,
    height: ICON_CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  // Label above, value below — the value is the line the eye should land on.
  rowText: {
    flex: 1,
    gap: 2,
  },
  stateBlock: {
    paddingVertical: spacing.xl,
  },
}));
