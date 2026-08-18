import { themed } from '@shared/styles';

export const rootNavigatorStyles = themed(({ colors }) => ({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
}));
