import { spacing, themed, typography } from "@shared/styles";

export const accountScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.foreground,
  },
  email: {
    ...typography.body,
    color: colors.muted,
  },
  prompt: {
    ...typography.body,
    color: colors.muted,
  },
}));
