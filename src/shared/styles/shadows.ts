import { StyleSheet } from "react-native";
import { darkColors } from "./dark";
import type { ElevatedBorder, ThemeShadows } from "./theme.types";

const NONE = {
  shadowColor: "transparent",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
};

// HeroUI stacks three box-shadow layers; RN allows one, so each stack
// collapses to its dominant layer.
export const lightShadows: ThemeShadows = {
  none: NONE,
  surface: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  field: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  overlay: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 12,
  },
  level1: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  level2: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  level3: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  level4: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
};

export const darkShadows: ThemeShadows = {
  none: NONE,
  surface: NONE,
  field: NONE,
  overlay: NONE,
  level1: NONE,
  level2: NONE,
  level3: NONE,
  level4: NONE,
};

export const lightElevatedBorder: ElevatedBorder = {
  borderWidth: 0,
  borderColor: "transparent",
};

export const darkElevatedBorder: ElevatedBorder = {
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: darkColors.borderSecondary,
};

/**
 * @deprecated Light-theme snapshot kept so unmigrated feature styles keep
 * compiling. Read shadows off the theme instead.
 */
export const shadows = lightShadows;

export type Shadows = typeof shadows;
