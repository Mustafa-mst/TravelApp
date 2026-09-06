import type { ComponentType, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

export type ListGroupItem = {
  key: string;
  title: string;
  description?: string;
  Icon?: ComponentType<SvgProps>;
  /** Tints the prefix icon; falls back to the row's foreground. */
  iconColor?: string;
  suffix?: ReactNode;
  content?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

export type ListGroupProps = {
  items: ListGroupItem[];
  hideSeparator?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type ListGroupRowProps = {
  item: ListGroupItem;
  isOpen: boolean;
  onToggle: (key: string) => void;
};
