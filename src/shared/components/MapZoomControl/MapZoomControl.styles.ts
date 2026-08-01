import { StyleSheet } from "react-native";
import { colors, radius, shadows } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.full,
    justifyContent: "center",
    borderColor: colors.border,
    backgroundColor: colors.white,
    ...shadows.level1,
  },
  button: {
    padding: 8,
  },
  divider: {
    paddingHorizontal: 6,
  },
});
