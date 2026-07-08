import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@shared/styles';

export const styles = StyleSheet.create({
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
    color: colors.text,
  },
  email: {
    ...typography.body,
    color: colors.textMuted,
  },
  prompt: {
    ...typography.body,
    color: colors.textMuted,
  },
});
