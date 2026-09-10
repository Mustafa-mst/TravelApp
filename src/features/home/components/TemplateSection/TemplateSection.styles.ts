import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  // The page spans the full card width; its inset is what lets the next card peek.
  // Vertical room keeps the card's shadow from being clipped by the row.
  page: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
