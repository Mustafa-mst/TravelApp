import { StyleSheet } from "react-native";
import { colors } from "@shared/styles";

export const ACTIVE_SEGMENT_WIDTH = 50;
export const INACTIVE_SEGMENT_WIDTH = 20;
export const SEGMENT_HEIGHT = 6;
export const SEGMENT_RADIUS = 20;

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
});
