import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md - 4,
  },
  info: {
    gap: spacing.xs / 2,
    paddingHorizontal: spacing.xs,
  },
  options: {
    gap: spacing.xs,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md - 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  optionText: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
