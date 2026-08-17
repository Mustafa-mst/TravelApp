import { colors, radius, spacing } from "@shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
});
