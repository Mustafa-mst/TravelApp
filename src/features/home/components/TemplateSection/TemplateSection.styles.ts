import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  // Balances the per-page left inset so the last card keeps its right margin.
  content: {
    paddingRight: spacing.lg,
  },
  // Padding on one side only, so consecutive cards sit one gap apart rather than two.
  // Vertical room keeps the card's shadow from being clipped by the row.
  page: {
    paddingLeft: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
