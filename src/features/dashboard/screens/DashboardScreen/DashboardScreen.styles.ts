import { spacing, themed } from "@shared/styles";

const SCREEN_INSET = spacing.md - 4;

export const dashboardScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: SCREEN_INSET,
    gap: SCREEN_INSET,
  },
}));
