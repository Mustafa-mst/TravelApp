import { spacing, themed, themedValue } from "@shared/styles";

// Gradient underline beneath the active segment: light mint → green → deep green.
export const underlineGradient = themedValue(({ colors }) => ({
  colors: [
    colors.segmentUnderlineStart,
    colors.segmentUnderlineMid,
    colors.segmentUnderlineEnd,
  ] as const,
  locations: [0, 0.5, 1] as const,
}));

export const segmentedControlStyles = themed(({ colors }) => ({
  container: {
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  segment: {
    paddingBottom: spacing.sm,
  },
  label: {
    color: colors.muted,
  },
  labelActive: {
    color: colors.foreground,
  },
  underlineTrack: {
    height: 4,
    overflow: "hidden",
  },
  underlineFill: {
    flex: 1,
  },
}));
