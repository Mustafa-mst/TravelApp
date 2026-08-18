import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes, type ThemeMode, type ThemeName } from "@shared/styles";
import { ThemeContext, type ThemeContextValue } from "./themeContext";

const STORAGE_KEY = "app.themeMode";

const THEME_MODES: ThemeMode[] = ["light", "dark", "system"];

// Feature screens are still theme-blind, so dark would render them wrong.
// Flip to true once they are migrated.
const THEME_DARK_ENABLED = false;

function isThemeMode(value: string | null): value is ThemeMode {
  return value !== null && THEME_MODES.includes(value as ThemeMode);
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  // Restore any previously persisted selection, overriding the system default.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (isThemeMode(stored)) {
          setModeState(stored);
        }
      })
      .catch(() => {});
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const resolved: ThemeName =
    mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;
  const themeName: ThemeName = THEME_DARK_ENABLED ? resolved : "light";

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: themes[themeName], themeName, mode, setMode }),
    [themeName, mode, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
