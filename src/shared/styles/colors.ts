export const colors = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  background: "#FFFFFF",
  backgroundTertiary: "#F3F3F3",
  surface: "#F3F4F6",
  grey200: "#F0F0F0",
  grey600: "#798086",
  text: "#111827",
  textLight: "#0C0C0C99",
  textMuted: "#6B7280",
  textTertiary: "#8F8F8F",
  iconTertiary: "#8F8F8F",
  border: "#E5E7EB",
  borderMuted: "#E9E7E5",
  warning: "#F59E0B",
  danger: "#DC2626",
  success: "#16A34A",
  white: "#FFFFFF",
  progressTrack: "#FCFAF666",
  transparent: "transparent",
} as const;

export type Color = keyof typeof colors;
