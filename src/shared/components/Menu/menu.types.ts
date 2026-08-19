import type { ComponentType, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

export type MenuItemVariant = "default" | "danger";

export type MenuSelectionMode = "none" | "single" | "multiple";

export type MenuPlacement = "top" | "bottom" | "left" | "right";

export type MenuAlign = "start" | "center" | "end";

export type MenuIndicator = "checkmark" | "dot";

export type MenuItem = {
  id: string;
  label: string;
  description?: string;
  Icon?: ComponentType<SvgProps>;
  variant?: MenuItemVariant;
  isDisabled?: boolean;
  /** Turns the row into an expandable group instead of a selectable item. */
  children?: MenuItem[];
};

export type MenuProps = {
  items: MenuItem[];
  /** Wrapped so its on-screen rect can be measured. */
  trigger: ReactNode;
  onSelect?: (item: MenuItem) => void;
  selectionMode?: MenuSelectionMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  indicator?: MenuIndicator;
  placement?: MenuPlacement;
  align?: MenuAlign;
  offset?: number;
  alignOffset?: number;
  width?: number;
  label?: string;
  closeOnSelect?: boolean;
  animated?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

