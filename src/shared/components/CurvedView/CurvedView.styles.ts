import { StyleSheet } from 'react-native';
import { colors, radius } from '@shared/styles';

export const styles = StyleSheet.create({
  curved: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.xxl,
    borderColor: colors.borderMuted,
    overflow: 'hidden',
  },
});
