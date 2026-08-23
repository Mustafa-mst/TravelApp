import { spacing, themed, typography } from "@shared/styles";

export const loginScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg,
    justifyContent: "center",
  },
  title: {
    ...typography.h3,
    color: colors.foreground,
  },
}));
