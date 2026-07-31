import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg - 4,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundTertiary,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  value: {
    minWidth: 96,
    textAlign: "center",
  },
});
