import { memo } from "react";
import { View } from "react-native";

import { useStyles, useThemeColors } from "@shared/hooks";
import { radius as radiusTokens } from "@shared/styles";
import { Text } from "../Text";
import { cardShadows, cardStyles, cardVariants } from "./Card.styles";
import type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./card.types";

function CardComponent({
  children,
  variant = "default",
  shadow = "none",
  radius = "xl",
  style,
  ...rest
}: CardProps) {
  const styles = useStyles(cardStyles);
  const shadows = useStyles(cardShadows);
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors[cardVariants[variant]],
          borderRadius: radiusTokens[radius],
        },
        shadows[shadow],
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

function CardHeaderComponent({ children, ...rest }: CardHeaderProps) {
  return <View {...rest}>{children}</View>;
}

function CardBodyComponent({ children, style, ...rest }: CardBodyProps) {
  const styles = useStyles(cardStyles);

  return (
    <View style={[styles.body, style]} {...rest}>
      {children}
    </View>
  );
}

function CardFooterComponent({ children, ...rest }: CardFooterProps) {
  return <View {...rest}>{children}</View>;
}

function CardTitleComponent({
  children,
  variant = "bodyLargeMedium",
  color = "foreground",
  ...rest
}: CardTitleProps) {
  return (
    <Text variant={variant} color={color} {...rest}>
      {children}
    </Text>
  );
}

function CardDescriptionComponent({
  children,
  variant = "body",
  color = "muted",
  ...rest
}: CardDescriptionProps) {
  return (
    <Text variant={variant} color={color} {...rest}>
      {children}
    </Text>
  );
}

export const Card = Object.assign(memo(CardComponent), {
  Header: memo(CardHeaderComponent),
  Body: memo(CardBodyComponent),
  Title: memo(CardTitleComponent),
  Description: memo(CardDescriptionComponent),
  Footer: memo(CardFooterComponent),
});
