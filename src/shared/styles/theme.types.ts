import type { ViewStyle } from "react-native";

export type ThemeName = "light" | "dark";

/** How the app picks a theme. `system` follows the OS appearance. */
export type ThemeMode = ThemeName | "system";

export type ThemeColors = {
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  backgroundInverse: string;
  foreground: string;

  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  surfaceHover: string;

  overlay: string;
  backdrop: string;
  muted: string;

  default: string;
  defaultForeground: string;
  defaultHover: string;
  defaultSoft: string;
  defaultSoftHover: string;

  accent: string;
  accentForeground: string;
  accentHover: string;
  accentSoft: string;
  accentSoftHover: string;
  accentSoftForeground: string;

  success: string;
  successForeground: string;
  successHover: string;
  successSoft: string;
  successSoftHover: string;
  successSoftForeground: string;

  warning: string;
  warningForeground: string;
  warningHover: string;
  warningSoft: string;
  warningSoftHover: string;
  warningSoftForeground: string;

  danger: string;
  dangerForeground: string;
  dangerHover: string;
  dangerSoft: string;
  dangerSoftHover: string;
  dangerSoftForeground: string;

  fieldBackground: string;
  fieldForeground: string;
  fieldPlaceholder: string;
  fieldBorder: string;
  fieldHover: string;

  segment: string;
  segmentForeground: string;

  border: string;
  borderSecondary: string;
  borderTertiary: string;
  separator: string;
  separatorSecondary: string;
  separatorTertiary: string;

  focus: string;
  link: string;
  transparent: string;

  // App tokens — no HeroUI equivalent, but they still need a dark variant.
  staticWhite: string;
  staticBlack: string;
  backdropStrong: string;
  folderBack: string;
  folderFront: string;
  tabBarBackground: string;
  tabBarItemActive: string;
  tabBarIconActive: string;
  tabBarIconInactive: string;
};

export type ColorToken = keyof ThemeColors;

type Shadow = Pick<
  ViewStyle,
  "shadowColor" | "shadowOpacity" | "shadowRadius" | "shadowOffset" | "elevation"
>;

export type ThemeShadows = Record<
  | "none"
  | "surface"
  | "field"
  | "overlay"
  | "level1"
  | "level2"
  | "level3"
  | "level4",
  Shadow
>;

/** Stands in for HeroUI's inset ring, which React Native cannot express. */
export type ElevatedBorder = Pick<ViewStyle, "borderWidth" | "borderColor">;

export type Theme = {
  name: ThemeName;
  colors: ThemeColors;
  shadows: ThemeShadows;
  elevatedBorder: ElevatedBorder;
};
