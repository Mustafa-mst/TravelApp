import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  listArea: {
    flex: 1,
  },
  listContent: {
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  stateBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
});
