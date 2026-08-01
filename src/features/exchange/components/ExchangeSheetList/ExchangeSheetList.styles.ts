import { colors, spacing } from "@/shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  optionDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  optionText: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  flag: {
    width: 26,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
  },
});
