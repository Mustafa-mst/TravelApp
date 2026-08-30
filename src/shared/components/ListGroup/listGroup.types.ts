import type { ComponentType, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";
import type { Radius } from "@shared/styles";

export type ListGroupVariant =
  | "default"
  | "secondary"
  | "tertiary"
  | "transparent";

export type ListGroupItem = {
  key: string;
  title: string;
  description?: string;
  Icon?: ComponentType<SvgProps>;
  suffix?: ReactNode;
  content?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

export type ListGroupProps = {
  items: ListGroupItem[];
  variant?: ListGroupVariant;
  radius?: Radius;
  hideSeparator?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type ListGroupRowProps = {
  item: ListGroupItem;
  isOpen: boolean;
  onToggle: (key: string) => void;
};
