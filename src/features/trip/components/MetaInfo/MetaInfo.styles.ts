import { StyleSheet } from "react-native";

import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexShrink: 1,
  },
  text: {
    color: colors.textMuted,
    flexShrink: 1,
  },
});
