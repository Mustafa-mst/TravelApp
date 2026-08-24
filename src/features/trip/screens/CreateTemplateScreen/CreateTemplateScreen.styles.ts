import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
  footer: {
    paddingHorizontal: spacing.md - 4,
  },
});
