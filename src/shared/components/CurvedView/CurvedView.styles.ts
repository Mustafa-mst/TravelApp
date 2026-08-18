import { radius, themed } from '@shared/styles';

export const curvedViewStyles = themed(({ colors }) => ({
  curved: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.xxl,
    borderColor: colors.border,
    overflow: 'hidden',
  },
}));
