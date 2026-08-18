import { darkColors } from "./dark";
import { lightColors } from "./light";
import {
  darkElevatedBorder,
  darkShadows,
  lightElevatedBorder,
  lightShadows,
} from "./shadows";
import type { Theme, ThemeName } from "./theme.types";

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: "light",
    colors: lightColors,
    shadows: lightShadows,
    elevatedBorder: lightElevatedBorder,
  },
  dark: {
    name: "dark",
    colors: darkColors,
    shadows: darkShadows,
    elevatedBorder: darkElevatedBorder,
  },
};

export const themeNames = ["light", "dark"] as const;
