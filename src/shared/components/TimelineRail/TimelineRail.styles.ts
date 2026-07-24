import { StyleSheet } from "react-native";
import { radius } from "@shared/styles";

export const TRACK_GAP = 3;
export const LINE_WIDTH = 4;
export const CAP_WIDTH = 5;
export const CAP_HEIGHT = 10;
/** Gap between the node edge and the outer ring. */
export const RING_GAP = 3;
/** Outer ring border thickness. */
export const RING_WIDTH = 2;

export const styles = StyleSheet.create({
  rail: {
    alignItems: "center",
  },
  node: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: radius.full,
    borderWidth: RING_WIDTH,
    zIndex: 100,
  },
  connector: {
    position: "absolute",
    width: LINE_WIDTH,
    borderRadius: radius.full,
  },
  cap: {
    position: "absolute",
    top: 0,
    width: CAP_WIDTH,
    height: CAP_HEIGHT,
    borderRadius: radius.full,
  },
});
