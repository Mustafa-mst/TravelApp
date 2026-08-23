import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

const CARD_ASPECT_RATIO = 1.5;
const CARD_FRAME_WIDTH = 4;
const FAVORITE_SIZE = 36;
const SUBTITLE_OPACITY = 0.9;
const BODY_GAP = 2;

// A fixed scrim over the photo, not a themed surface — it must darken the
// image identically in both themes so the overlaid text stays legible.
export const DESTINATION_SCRIM_COLORS = [
  "transparent",
  "rgba(0, 0, 0, 0.75)",
] as const;

export const destinationCardStyles = themed(({ colors, shadows }) => ({
  shadow: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.level3,
  },
  card: {
    aspectRatio: CARD_ASPECT_RATIO,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: CARD_FRAME_WIDTH,
    borderColor: colors.surface,
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  favorite: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: FAVORITE_SIZE,
    height: FAVORITE_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  body: {
    padding: spacing.md,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    maxWidth: "70%",
    gap: BODY_GAP,
  },
  title: {
    textAlign: "right",
  },
  subtitle: {
    opacity: SUBTITLE_OPACITY,
    textAlign: "right",
  },
}));
