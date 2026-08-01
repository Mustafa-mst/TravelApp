import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  title: {
    paddingHorizontal: spacing.lg,
  },
  list: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
