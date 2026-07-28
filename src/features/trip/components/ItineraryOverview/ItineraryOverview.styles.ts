import { StyleSheet } from "react-native";

import { spacing } from "@shared/styles";

const ROW_GAP = spacing.md;

export const styles = StyleSheet.create({
  content: {
    gap: ROW_GAP,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
