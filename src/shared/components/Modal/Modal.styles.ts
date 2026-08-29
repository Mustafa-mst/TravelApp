import { radius, spacing, themed } from '@shared/styles';

export const modalStyles = themed(({ colors, shadows, elevatedBorder }) => ({
  backdrop: {
    flex: 1,
    // A centred dialog needs more separation than the sheet-weight `backdrop`.
    backgroundColor: colors.backdropStrong,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    width: '100%',
    backgroundColor: colors.overlay,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.overlay,
    ...elevatedBorder,
  },
}));
