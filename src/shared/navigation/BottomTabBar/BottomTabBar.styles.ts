import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
    ...shadows.level3,
  },
  item: {
    width: 78,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: spacing.md - 4,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  itemActive: {
    backgroundColor: colors.tabBarBackground,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...typography.bodySmall,
    textAlign: "center",
    color: colors.iconSecondary,
  },
  labelActive: {
    color: colors.primary,
  },
});
