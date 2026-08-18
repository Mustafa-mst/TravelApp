import type { ReactNode } from "react";
import type { PressableProps, TextProps, ViewProps } from "react-native";
import type { ColorToken, TypographyVariant } from "@shared/styles";

export type ListGroupVariant =
  | "default"
  | "secondary"
  | "tertiary"
  | "transparent";

export type ListGroupProps = {
  children?: ReactNode;
  variant?: ListGroupVariant;
} & ViewProps;

export type ListGroupItemProps = {
  children?: ReactNode;
} & PressableProps;

export type ListGroupItemPrefixProps = {
  children?: ReactNode;
} & ViewProps;

export type ListGroupItemContentProps = {
  children?: ReactNode;
} & ViewProps;

type ListGroupTextProps = {
  children?: ReactNode;
  variant?: TypographyVariant;
  color?: ColorToken;
} & TextProps;

export type ListGroupItemTitleProps = ListGroupTextProps;

export type ListGroupItemDescriptionProps = ListGroupTextProps;

export type ListGroupIconProps = {
  size?: number;
  color?: string;
};

export type ListGroupItemSuffixProps = {
  children?: ReactNode;
  /** Customises the default chevron. Ignored when children are provided. */
  iconProps?: ListGroupIconProps;
} & ViewProps;
