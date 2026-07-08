import { colors, spacing } from "@/shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  options: {
    gap: spacing.xs,
    paddingHorizontal: 16,
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
  flag: {
    width: 26,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    
    borderColor:colors.borderMuted
  },
});
