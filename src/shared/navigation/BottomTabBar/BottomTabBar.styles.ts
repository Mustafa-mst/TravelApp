import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: -spacing.xxl,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: radius.full,
    backgroundColor: colors.tabBarBackground,
    marginBottom: spacing.sm,
    ...shadows.level3,
  },
  item: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: spacing.md - 4,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  itemActive: {
    backgroundColor: colors.tabBarItemActive,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
