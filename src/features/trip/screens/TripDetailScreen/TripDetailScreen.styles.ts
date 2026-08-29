import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

const HERO_HEIGHT = 280;
const MAP_CARD_ASPECT = 325 / 167;
const MAP_CARD_BORDER_WIDTH = 5;

export const tripDetailStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    // Room for the pinned TripActions bar that overlays the scroll view.
    paddingBottom: spacing.xxl * 2,
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
    backgroundColor: colors.backdrop,
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
    aspectRatio: MAP_CARD_ASPECT,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: MAP_CARD_BORDER_WIDTH,
    borderColor: colors.surface,
  },
}));
