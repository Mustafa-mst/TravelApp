import { memo } from 'react';
import {
  Text as RNText,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { useThemeColors } from '@shared/hooks';
import { type ColorToken, type TypographyVariant } from '@shared/styles';
import { styles } from './Text.styles';

/** A theme token, or any raw colour string — brand hexes until the tokens catch up. */
type TextColor = ColorToken | (string & {});

type TextComponentProps = {
  variant?: TypographyVariant;
  color?: TextColor;
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
  const resolvedColor = color in colors ? colors[color as ColorToken] : color;

  return (
    <RNText
      style={[styles[variant], { color: resolvedColor, textAlign }, style]}
      {...rest}
    />
  );
}

export const Text = memo(TextComponent);
