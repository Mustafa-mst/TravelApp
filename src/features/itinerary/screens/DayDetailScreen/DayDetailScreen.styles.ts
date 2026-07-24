import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

const HERO_HEIGHT = 280;

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    width: "100%",
    height: HERO_HEIGHT,
  },
  body: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg - 4,
  },
  titleBlock: {
    gap: spacing.sm,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaSeparator: {
    paddingVertical: spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    letterSpacing: -0.2,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs + 2,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md - 4,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    ...shadows.level1,
  },
  items: {
    paddingTop: spacing.xs,
    gap: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
