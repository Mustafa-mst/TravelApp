export const colors = {
  primary: "#0E7C66",
  primaryLight: "#16A085",

  background: "#FAFAFA",
  backgroundTertiary: "#F3F3F3",
  backgroundSecondary: "#E8E8E8",

  surface: "#F3F4F6",
  grey200: "#F0F0F0",
  grey600: "#798086",
  text: "#111827",
  textLight: "#0C0C0C99",
  textMuted: "#6B7280",

  textPrimary: "#0D0D0D",
  textSecondary: "#5D5D5D",
  textTertiary: "#8F8F8F",
  textInverted: "#FFFFFF",

  iconPrimary: "#0D0D0D",
  iconTertiary: "#8F8F8F",
  iconSecondary: "#5D5D5D",
  iconInverted: "#FFFFFF",

  border: "#E5E7EB",
  borderMuted: "#E9E7E5",
  warning: "#F59E0B",
  danger: "#DC2626",
  success: "#008635",
  white: "#FFFFFF",
  progressTrack: "#FCFAF666",
  neutral: "#FCFCFC",
  transparent: "transparent",

  tabBarBackground: "#E3E3E3",
  tabBarActive: "#FFFFFF",
  tabBarActiveContent: "#1A1A1A",
} as const;

export type Color = keyof typeof colors;
