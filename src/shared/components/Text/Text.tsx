import { memo } from 'react';
import {
  Text as RNText,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { useThemeColors } from '@shared/hooks';
import { type ColorToken, type TypographyVariant } from '@shared/styles';
import { styles } from './Text.styles';

type TextComponentProps = {
  variant?: TypographyVariant;
  color?: ColorToken;
  textAlign?: TextStyle['textAlign'];
} & TextProps;

function TextComponent({
  variant = 'body',
  color = 'foreground',
  textAlign,
  style,
  ...rest
}: TextComponentProps) {
  const colors = useThemeColors();

  return (
    <RNText
      style={[styles[variant], { color: colors[color], textAlign }, style]}
      {...rest}
    />
  );
}

export const Text = memo(TextComponent);
