import { radius, spacing, themed } from "@shared/styles";

const ROW_INFO_GAP = 2;

export const addPlacesSheetStyles = themed(({ colors }) => ({
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  listArea: {
    flex: 1,
  },
  listContent: {
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  stateBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.transparent,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rowSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceSecondary,
  },
  rowInfo: {
    flex: 1,
    gap: ROW_INFO_GAP,
  },
}));
