import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

export const CURRENCY_SHEET_SNAP_POINTS = ["100%"];

export const currencySheetStyles = themed(({ colors }) => ({
  card: {
    flex: 1,
  },
  cardContent: {
    paddingHorizontal: spacing.md,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
}));
