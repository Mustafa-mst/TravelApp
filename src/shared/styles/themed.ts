import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from "react-native";
import { themes } from "./themes";
import type { Theme, ThemeName } from "./theme.types";

type NamedStyles<T> = { [K in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type ThemedStyles<T> = Record<ThemeName, T>;

/**
 * Builds the sheet once per theme, eagerly. Two frozen results with stable
 * identities, so a theme switch swaps a reference instead of re-creating
 * styles — `memo`'d children whose props are unchanged never re-render.
 */
export function themed<T extends NamedStyles<T>>(
  build: (theme: Theme) => T & NamedStyles<T>,
): ThemedStyles<T> {
  return {
    light: StyleSheet.create(build(themes.light)),
    dark: StyleSheet.create(build(themes.dark)),
  };
}

/** Same, for lookup objects that hold resolved values rather than styles. */
export function themedValue<T>(build: (theme: Theme) => T): ThemedStyles<T> {
  return { light: build(themes.light), dark: build(themes.dark) };
}
