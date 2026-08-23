import { radius, spacing, themed } from "@shared/styles";

export const REGION_ICON_SIZE = 28;

export const searchFilterCardStyles = themed(({ colors }) => ({
  card: {
    flexShrink: 0,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: spacing.sm,
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
    marginTop: spacing.sm,
  },
  footerButton: {
    flex: 1,
  },
  clearButton: {
    flex: 1,
  },
}));
