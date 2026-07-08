import { StyleSheet } from 'react-native';
import { colors, radius, typography } from '@shared/styles';

export const styles = StyleSheet.create({
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
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    ...typography.subtitle,
    color: colors.textMuted,
  },
});
