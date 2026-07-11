import { memo } from 'react';
import {
  Text as RNText,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { colors, type Color, type TypographyVariant } from '@shared/styles';
import { styles } from './Text.styles';

type TextComponentProps = {
  variant?: TypographyVariant;
  color?: Color;
  textAlign?: TextStyle['textAlign'];
} & TextProps;

function TextComponent({
  variant = 'body',
  color = 'text',
  textAlign,
  style,
  ...rest
}: TextComponentProps) {
  return (
    <RNText
      style={[styles[variant], { color: colors[color], textAlign }, style]}
      {...rest}
    />
  );
}

export const Text = memo(TextComponent);
