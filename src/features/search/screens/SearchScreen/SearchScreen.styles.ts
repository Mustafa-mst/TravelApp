import { spacing, themed } from "@shared/styles";

const SCREEN_GUTTER = spacing.md - 4;

export const searchScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: SCREEN_GUTTER,
    gap: SCREEN_GUTTER,
  },
}));
