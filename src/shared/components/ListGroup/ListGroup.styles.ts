import { StyleSheet } from "react-native";
import { spacing, themed } from "@shared/styles";

const DISABLED_OPACITY = 0.5;

export const listGroupStyles = themed(({ colors }) => ({
  root: {
    borderCurve: "continuous",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    gap: spacing.sm + spacing.xs,
  },
  info: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  contentWrapper: {
    overflow: "hidden",
  },
  // Measured off-flow so the wrapper can animate to a known height.
  contentMeasure: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  contentInner: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
}));
