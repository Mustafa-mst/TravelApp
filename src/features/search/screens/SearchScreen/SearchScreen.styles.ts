import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md - 4,
    gap: spacing.md - 4,
  },
});
