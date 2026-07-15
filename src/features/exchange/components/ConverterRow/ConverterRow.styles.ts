import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  fields: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  amountInput: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    padding: 0,
  },
});
