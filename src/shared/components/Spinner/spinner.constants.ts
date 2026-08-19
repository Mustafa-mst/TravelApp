import type { SpinnerSize } from "./spinner.types";

/** Root box and icon share these, matching HeroUI's spinner.css and SPINNER_SIZE_MAP. */
export const SPINNER_SIZE: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

/** Upstream default: 1000ms / 1.1 rotation speed. */
export const SPINNER_ROTATION_DURATION_MS = 909;

export const SPINNER_VIEWBOX = "0 0 24 24";
