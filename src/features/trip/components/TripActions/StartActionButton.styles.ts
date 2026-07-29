import { StyleSheet } from "react-native";

import { colors, radius, spacing } from "@shared/styles";

export const ICON_SIZE = 20;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.text,
  },
  iconBadge: {
    padding: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.textSecondary,
  },
});
