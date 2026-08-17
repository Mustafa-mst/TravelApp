import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  filled: {
    backgroundColor: colors.surface,
  },
  rounded: {
    borderRadius: radius.full,
    backgroundColor: colors.white,
    padding: spacing.md - 6,
    borderColor: colors.border,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
});
