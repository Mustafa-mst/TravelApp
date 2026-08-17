import { type ComponentType, type ReactNode } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { type SvgProps } from "react-native-svg";

export type AccordionSelectionMode = "single" | "multiple";
export type AccordionVariant = "plain" | "surface";
export type AccordionValue = string | string[] | undefined;

export type AccordionItem = {
  key: string;
  title: string;
  subtitle?: string;
  Icon?: ComponentType<SvgProps>;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  selectionMode?: AccordionSelectionMode;
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: AccordionValue) => void;
  variant?: AccordionVariant;
  hideSeparator?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type AccordionRowProps = {
  item: AccordionItem;
  isOpen: boolean;
  isSurface: boolean;
  isDisabled: boolean;
  onPress: (key: string) => void;
};
