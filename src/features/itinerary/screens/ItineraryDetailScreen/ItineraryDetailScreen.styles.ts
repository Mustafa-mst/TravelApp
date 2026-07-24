import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

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
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlayScrim,
  },
  titleBlock: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  body: {
    paddingHorizontal: spacing.md,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapCard: {
    marginBottom: spacing.md,
    width: "100%",
    aspectRatio: 325 / 167,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: colors.white,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
