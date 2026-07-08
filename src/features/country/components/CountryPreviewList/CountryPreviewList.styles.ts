import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingVertical: spacing.lg - 4,
  },
  title: {
    paddingHorizontal: spacing.md,
  },
  list: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
