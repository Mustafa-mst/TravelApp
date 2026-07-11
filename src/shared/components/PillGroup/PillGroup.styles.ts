import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  pillActive: {
    backgroundColor: colors.white,
  },
  pillBorderless: {
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
  },
  pillPressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.text,
  },
  labelActive: {
    color: colors.success,
  },
});
