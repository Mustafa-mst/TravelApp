import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: spacing.xl,
    gap: 16,
  },

  // Rate hero
  hero: {
    alignItems: "center",
    gap: spacing.xs,
  },
  heroRate: {
    fontSize: 56,
    lineHeight: 64,
    marginTop: spacing.sm,
  },
  heroRateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  converterWrap: {
    position: "relative",
  },
  converterCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: 16,
    ...shadows.level1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  swapButton: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
});
