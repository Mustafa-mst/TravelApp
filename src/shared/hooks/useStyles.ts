import type { ThemedStyles } from "@shared/styles";
import { useTheme } from "./useTheme";

/** Picks the sheet for the active theme. Both were built at module load. */
export function useStyles<T>(styles: ThemedStyles<T>): T {
  return styles[useTheme().themeName];
}
