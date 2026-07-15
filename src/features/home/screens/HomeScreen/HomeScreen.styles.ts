import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    gap: spacing.lg,
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.lg,
  },
  heroText: {
    gap: spacing.xs,
    maxWidth: "85%",
  },
  heroTitle: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  search: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: radius.full,
  },
  block: {
    paddingHorizontal: spacing.md,
  },
});
