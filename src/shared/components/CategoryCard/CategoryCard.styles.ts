import { StyleSheet } from 'react-native';
import { spacing, typography } from '@shared/styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  image: {
    width: '100%',
    aspectRatio: 114 / 75,
  },
  title: {
    ...typography.bodyMedium,
    textAlign: 'center',
  },
});
