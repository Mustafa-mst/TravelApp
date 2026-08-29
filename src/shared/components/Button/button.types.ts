import type { ComponentType } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";
import type { PressableScaleProps } from "../PressableScale";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "dangerSoft";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  isIconOnly?: boolean;
  fullWidth?: boolean;
  startIcon?: ComponentType<SvgProps>;
  endIcon?: ComponentType<SvgProps>;
  /** Layout: width, flex, alignSelf, margin. Goes on the outer animated view. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Visual: background, border, radius. Goes on the pressable itself. */
  style?: StyleProp<ViewStyle>;
} & Omit<PressableScaleProps, "style" | "containerStyle" | "children">;
