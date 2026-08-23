// `md`/`lg`/`xl`/`xxl` keep their pre-HeroUI values so existing feature styles
// stay pixel-identical. The HeroUI scale sits alongside under `hero*` and the
// numeric names; the two merge in phase 2.
export const radius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  xxl: 36,

  heroMd: 6,
  heroLg: 8,
  heroXl: 12,
  "2xl": 16,
  "3xl": 24,
  "4xl": 32,

  field: 14,
  full: 9999,
} as const;

export type Radius = keyof typeof radius;
