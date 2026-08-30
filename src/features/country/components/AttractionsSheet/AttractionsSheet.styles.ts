import { spacing, themed } from "@shared/styles";

export const ATTRACTIONS_SHEET_SNAP_POINTS = ["100%"];

export const attractionsSheetStyles = themed(() => ({
  listContent: {
    paddingHorizontal: spacing.md,
  },
  stateBlock: {
    paddingVertical: spacing.xl,
  },
}));
