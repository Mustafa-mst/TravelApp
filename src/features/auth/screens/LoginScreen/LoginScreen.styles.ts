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
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
});
