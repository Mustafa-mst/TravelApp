import { lightColors } from "./light";

/**
 * @deprecated Light-theme snapshot of the old 35-token palette. No longer has
 * any consumers — kept only as a mapping reference to the new tokens, and safe
 * to delete. Do not import it: it does NOT react to theme changes, so anything
 * reading it renders light in dark mode. Use `themed()` + `useStyles` instead.
 */
export const colors = {
  primary: lightColors.accent,
  primaryLight: lightColors.accentSoft,
  // Was a red-orange highlight, unrelated to HeroUI's blue `accent`.
  accent: lightColors.danger,

  background: lightColors.background,
  backgroundTertiary: lightColors.backgroundTertiary,
  backgroundSecondary: lightColors.backgroundSecondary,

  // Was a grey fill, not white — `surface` would blow these out.
  surface: lightColors.surfaceSecondary,
  grey200: lightColors.surfaceTertiary,
  grey600: lightColors.separator,
  text: lightColors.foreground,
  textLight: lightColors.muted,
  textMuted: lightColors.muted,

  textPrimary: lightColors.foreground,
  textSecondary: lightColors.muted,
  textTertiary: lightColors.muted,
  textInverted: lightColors.staticWhite,

  iconPrimary: lightColors.foreground,
  iconTertiary: lightColors.muted,
  iconSecondary: lightColors.muted,
  iconInverted: lightColors.staticWhite,

  border: lightColors.border,
  borderMuted: lightColors.border,
  warning: lightColors.warning,
  danger: lightColors.danger,
  success: lightColors.success,
  white: lightColors.surface,
  progressTrack: lightColors.defaultSoft,
  overlayScrim: lightColors.backdrop,
  neutral: lightColors.surface,
  transparent: lightColors.transparent,

  folderBack: lightColors.folderBack,
  folderFront: lightColors.folderFront,

  tabBarBackground: lightColors.tabBarBackground,
  tabBarItemActive: lightColors.tabBarItemActive,
  tabBarIconActive: lightColors.tabBarIconActive,
  tabBarIconInactive: lightColors.tabBarIconInactive,
} as const;

/** @deprecated Use `ColorToken` from the theme instead. */
export type Color = keyof typeof colors;
