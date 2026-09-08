import { spacing, themed } from "@shared/styles";

export const REGION_ICON_SIZE = 28;

/**
 * Fixed height on purpose: with dynamic sizing the accordion's height spring and
 * the sheet's own resize animation chase each other, which drags out the open
 * and makes the sheet jump on close.
 */
export const FILTER_SHEET_SNAP_POINTS = ["70%"];

export const searchFilterSheetStyles = themed(({ colors }) => ({
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + spacing.xs,
    paddingVertical: spacing.sm + spacing.xs,
  },
  optionDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  optionLabel: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerButton: {
    flex: 1,
  },
}));
