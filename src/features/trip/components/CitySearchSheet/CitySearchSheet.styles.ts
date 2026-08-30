import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

export const citySearchSheetStyles = themed(({ colors }) => ({
  card: {
    flex: 1,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  cardContent: {
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingVertical: spacing.md - 2,
    paddingRight: spacing.md,
  },
  pinContainer: {
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.sm - 2,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  rowLabel: {
    flexShrink: 1,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: spacing.lg,
  },
  empty: {
    alignSelf: "center",
    marginVertical: spacing.lg,
  },
}));

export const CITY_PIN_ICON_SIZE = 20;
export const CITY_CHECK_ICON_SIZE = 18;
