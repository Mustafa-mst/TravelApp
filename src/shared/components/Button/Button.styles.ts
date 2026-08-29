import { radius, themed, type ColorToken } from "@shared/styles";
import type { ButtonVariant } from "./button.types";

export const buttonStyles = themed(() => ({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // Clips the PressableScale highlight overlay to the border radius.
    overflow: "hidden",
    borderCurve: "continuous",
  },
  sm: {
    height: 40,
    paddingHorizontal: 14,
    gap: 6,
    borderRadius: radius["3xl"],
  },
  md: {
    height: 48,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: radius["3xl"],
  },
  lg: {
    height: 56,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: radius["4xl"],
  },
  outlined: {
    borderWidth: 1,
  },
  iconOnly: {
    paddingHorizontal: 0,
    aspectRatio: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  wrapContent: {
    alignSelf: "flex-start",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
}));

type ButtonPalette = {
  background: ColorToken;
  foreground: ColorToken;
  /** Swapped in while pressed, as an opaque overlay rather than a fade. */
  hover: ColorToken;
  border?: ColorToken;
};

export const buttonVariants: Record<ButtonVariant, ButtonPalette> = {
  primary: {
    background: "accent",
    foreground: "accentForeground",
    hover: "accentHover",
  },
  // The accent-tinted label is what separates secondary from tertiary.
  secondary: {
    background: "default",
    foreground: "accentSoftForeground",
    hover: "defaultHover",
  },
  tertiary: {
    background: "default",
    foreground: "defaultForeground",
    hover: "defaultHover",
  },
  outline: {
    background: "transparent",
    foreground: "defaultForeground",
    hover: "defaultHover",
    border: "border",
  },
  ghost: {
    background: "transparent",
    foreground: "defaultForeground",
    hover: "defaultHover",
  },
  danger: {
    background: "danger",
    foreground: "dangerForeground",
    hover: "dangerHover",
  },
  dangerSoft: {
    background: "dangerSoft",
    foreground: "dangerSoftForeground",
    hover: "dangerSoftHover",
  },
};
