import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  signRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tile: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  iconBox: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
  },
});
