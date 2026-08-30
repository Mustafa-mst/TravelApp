import { StyleSheet } from "react-native";
import { spacing, themed } from "@shared/styles";

export const CURRENCY_SHEET_SNAP_POINTS = ["100%"];

export const currencySheetStyles = themed(({ colors }) => ({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
}));
