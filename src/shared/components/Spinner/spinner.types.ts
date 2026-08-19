import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import type { ColorToken } from "@shared/styles";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = {
  size?: SpinnerSize;
  /** A theme token, or any raw color string. */
  color?: ColorToken | (string & {});
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
} & Omit<ViewProps, "style" | "children">;

export type SpinnerIconProps = {
  width: number;
  height: number;
  color: string;
};
