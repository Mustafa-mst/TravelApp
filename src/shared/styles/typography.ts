export const typography = {
  display: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 44,
  },
  displaySemiBold: {
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 44,
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
  },
  h6: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  bodyLargeMedium: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
} as const;

export type TypographyVariant = keyof typeof typography;
