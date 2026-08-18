import { spacing, themed, themedValue } from "@shared/styles";

// Gradient underline beneath the active segment: pale → mid → deep accent.
export const underlineGradient = themedValue(({ colors }) => ({
  colors: [colors.accentSoft, colors.accent, colors.accentSoftForeground] as const,
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
    borderRadius: 2,
    overflow: "hidden",
  },
  underlineFill: {
    flex: 1,
  },
}));
