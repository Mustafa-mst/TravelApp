import type { ThemeColors } from "./theme.types";

export const lightColors: ThemeColors = {
  background: "#F5F5F5",
  backgroundSecondary: "#EBEBEB",
  backgroundTertiary: "#E1E1E1",
  backgroundInverse: "#18181B",
  foreground: "#18181B",

  surface: "#FFFFFF",
  surfaceSecondary: "#EFEFF0",
  surfaceTertiary: "#EAEAEB",
  surfaceHover: "#EAEAEA",

  overlay: "#FFFFFF",
  backdrop: "rgba(0, 0, 0, 0.2)",
  muted: "#71717A",

  default: "#EBEBEC",
  defaultForeground: "#18181B",
  defaultHover: "#E1E1E2",
  defaultSoft: "rgba(235, 235, 236, 0.5)",
  defaultSoftHover: "rgba(1, 1, 32, 0.6)",

  accent: "#0E7C66",
  accentForeground: "#FCFCFC",
  accentHover: "#16A085",
  accentSoft: "rgba(14, 124, 102, 0.15)",
  accentSoftHover: "rgba(14, 124, 102, 0.2)",
  accentSoftForeground: "#0B6352",

  success: "#17C964",
  successForeground: "#18181B",
  successHover: "#21B55D",
  successSoft: "rgba(23, 201, 100, 0.15)",
  successSoftHover: "rgba(23, 201, 100, 0.2)",
  successSoftForeground: "#2A8F4E",

  warning: "#F5A524",
  warningForeground: "#18181B",
  warningHover: "#DC952A",
  warningSoft: "rgba(245, 165, 36, 0.15)",
  warningSoftHover: "rgba(245, 165, 36, 0.2)",
  warningSoftForeground: "#A0702E",

  danger: "#FF383C",
  dangerForeground: "#FCFCFC",
  dangerHover: "#FF5551",
  dangerSoft: "rgba(255, 56, 60, 0.15)",
  dangerSoftHover: "rgba(255, 56, 60, 0.2)",
  dangerSoftForeground: "#CC3738",

  fieldBackground: "#FFFFFF",
  fieldForeground: "#18181B",
  fieldPlaceholder: "#71717A",
  // Not "transparent": withTiming drops the style animating to the keyword.
  fieldBorder: "rgba(0, 0, 0, 0)",
  fieldHover: "#F9F9F9",

  segment: "#FFFFFF",
  segmentForeground: "#18181B",

  border: "#DEDEE0",
  borderSecondary: "#C6C6C7",
  borderTertiary: "#A8A8A9",
  separator: "#AAAAAD",
  separatorSecondary: "#D8D8D8",
  separatorTertiary: "#CDCDCE",

  focus: "#0E7C66",
  link: "#18181B",
  transparent: "transparent",

  staticWhite: "#FFFFFF",
  staticBlack: "#000000",
  backdropStrong: "rgba(0, 0, 0, 0.5)",
  folderBack: "rgba(255, 255, 255, 0.8)",
  folderFront: "#FBFBFB",
  // The tab bar is a deliberately dark pill in light mode — an inversion,
  // not a surface, so it does not follow the surface ramp.
  tabBarBackground: "#18181B",
  tabBarItemActive: "rgba(255, 255, 255, 0.08)",
  tabBarIconActive: "#FCFCFC",
  tabBarIconInactive: "rgba(252, 252, 252, 0.6)",
  segmentUnderlineStart: "#ECF8EF",
  segmentUnderlineMid: "#3CA856",
  segmentUnderlineEnd: "#276D38",
};
