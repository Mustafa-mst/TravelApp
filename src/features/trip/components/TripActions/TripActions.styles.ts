import { StyleSheet } from "react-native";

import { colors, radius, shadows, spacing } from "@shared/styles";

export const ACTION_ICON_SIZE = 24;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md - 4,
  },
  actionButton: {
    padding: spacing.md - 4,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    ...shadows.level1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
});
