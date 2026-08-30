import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

export const currencyListRowStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + spacing.xs,
    paddingVertical: spacing.md,
  },
  flag: {
    width: 28,
    height: 20,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
  },
}));
