import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm + 4,
    paddingHorizontal: spacing.md - 4,
    paddingTop: spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.sm + 4,
  },
});
