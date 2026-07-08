import { colors, radius, spacing } from "@/shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md - 4,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md - 4,
  },
  button: {
    borderRadius: radius.full,
    backgroundColor: colors.grey200,
    padding: spacing.sm,
  },
});
