import type { ComponentType, ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

import type { AnchorAlign, AnchorPlacement } from "@shared/types";

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  Icon?: ComponentType<SvgProps>;
  isDisabled?: boolean;
};

export type SelectVariant = "primary" | "primaryBorder" | "secondary";

export type SelectPresentation = "popover" | "bottom-sheet";

export type SelectSelectionMode = "single" | "multiple";

/** Matches the trigger's measured width, or pins the surface to a fixed one. */
export type SelectWidth = number | "trigger";

export type SelectProps = {
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  selectionMode?: SelectSelectionMode;
  presentation?: SelectPresentation;
  /** Defaults to `t("common.select")`. */
  placeholder?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  /** Heading above the option list. */
  listLabel?: string;
  variant?: SelectVariant;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  animated?: boolean;
  /** Puts a search field above the options, in both presentations. */
  isSearchable?: boolean;
  searchValue?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  /** Shown in place of the list when a search returns nothing. */
  emptyMessage?: string;
  placement?: AnchorPlacement;
  align?: AnchorAlign;
  offset?: number;
  width?: SelectWidth;
  snapPoints?: (string | number)[];
  /** Rendered above the sheet list; use for a search header. */
  sheetHeader?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};
