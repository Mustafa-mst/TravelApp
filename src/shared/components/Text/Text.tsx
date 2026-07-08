import { memo } from 'react';
import { Text as RNText, type TextProps } from 'react-native';
import { colors, type Color, type TypographyVariant } from '@shared/styles';
import { styles } from './Text.styles';

type TextComponentProps = {
  variant?: TypographyVariant;
  color?: Color;
} & TextProps;

function TextComponent({
  variant = 'body',
  color = 'text',
  style,
  ...rest
}: TextComponentProps) {
  return (
    <RNText style={[styles[variant], { color: colors[color] }, style]} {...rest} />
  );
}

export const Text = memo(TextComponent);
