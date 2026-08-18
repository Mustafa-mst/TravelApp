import { createContext } from "react";
import type { Theme, ThemeMode, ThemeName } from "@shared/styles";

export type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

// A leaf module so `useTheme` can read the context without importing
// ThemeProvider, which would cycle back through the providers barrel.
export const ThemeContext = createContext<ThemeContextValue | null>(null);
