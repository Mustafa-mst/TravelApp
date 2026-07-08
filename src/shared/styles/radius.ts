export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  xxl: 36,
  full: 9999,
} as const;

export type Radius = keyof typeof radius;
