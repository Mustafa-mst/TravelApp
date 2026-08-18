import { radius, themed, typography } from '@shared/styles';

export const avatarStyles = themed(({ colors }) => ({
  sm: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
  },
  md: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
  },
  lg: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
  },
  fallback: {
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    ...typography.subtitle,
    color: colors.muted,
  },
}));
