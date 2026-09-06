import type { ReactNode } from "react";
import type { TextProps, ViewProps } from "react-native";
import type {
  ColorToken,
  Radius,
  ShadowToken,
  TypographyVariant,
} from "@shared/styles";

export type CardVariant =
  | "default"
  | "secondary"
  | "tertiary"
  | "transparent";

export type CardProps = {
  children?: ReactNode;
  variant?: CardVariant;
  shadow?: ShadowToken;
  radius?: Radius;
  bordered?: boolean;
} & ViewProps;

export type CardHeaderProps = {
  children?: ReactNode;
} & ViewProps;

export type CardBodyProps = {
  children?: ReactNode;
} & ViewProps;

export type CardFooterProps = {
  children?: ReactNode;
} & ViewProps;

type CardTextProps = {
  children?: ReactNode;
  variant?: TypographyVariant;
  color?: ColorToken;
} & TextProps;

export type CardTitleProps = CardTextProps;

export type CardDescriptionProps = CardTextProps;
