import { StyleSheet } from "react-native";
import { colors } from "@shared/styles";

export const ACTIVE_SEGMENT_WIDTH = 50;
export const INACTIVE_SEGMENT_WIDTH = 20;
export const SEGMENT_HEIGHT = 6;
export const SEGMENT_RADIUS = 20;
export const DOT_SIZE = 7;
export const DOT_GAP = 6;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  slide: {
    height: "100%",
  },
  progress: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  segment: {
    height: SEGMENT_HEIGHT,
    borderRadius: SEGMENT_RADIUS,
    backgroundColor: colors.progressTrack,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: SEGMENT_RADIUS,
    backgroundColor: colors.white,
  },
  dots: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: DOT_GAP,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SEGMENT_RADIUS,
    backgroundColor: colors.overlayScrim,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.white,
    opacity: 0.5,
  },
  activeDot: {
    position: "absolute",
    left: 10,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.white,
  },
});
