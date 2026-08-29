import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "@shared/providers/themeContext";
import type { ThemeColors } from "@shared/styles";

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>.");
  }
  return context;
}

export function useThemeColors(): ThemeColors {
  return useTheme().theme.colors;
}
