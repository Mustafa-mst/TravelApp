import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md - 4,
    gap: spacing.xxl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContent: {
    gap: spacing.xl,
    paddingBottom: 120,
  },
  columnWrapper: {
    gap: spacing.md,
  },
  addButton: {
    padding: 8,
    borderRadius: 999,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderWidth: 1,
  },
});
