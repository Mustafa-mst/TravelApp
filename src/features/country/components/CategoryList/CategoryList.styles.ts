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
  grid: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
  label: {
    textAlign: "center",
  },
});
