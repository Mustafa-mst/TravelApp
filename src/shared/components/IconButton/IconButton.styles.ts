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
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
});
