import { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableProps,
} from 'react-native';
import { colors } from '@shared/styles';
import { buttonColors, styles } from './Button.styles';

type ButtonType = 'primary' | 'secondary' | 'warning' | 'danger';
type ButtonState = 'loading' | 'disabled';

type ButtonProps = {
  label: string;
  type?: ButtonType;
  state?: ButtonState;
  outlined?: boolean;
  fullWidth?: boolean;
} & Omit<PressableProps, 'children'>;

function ButtonComponent({
  label,
  type = 'primary',
  state,
  outlined = false,
  fullWidth = false,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = state === 'disabled';
  const isLoading = state === 'loading';

  const palette = buttonColors[type];
  // Outlined: transparent background, the type color becomes border + content color.
  const tone = outlined ? colors[palette.background] : colors[palette.foreground];
  const backgroundColor = outlined
    ? colors.transparent
    : colors[palette.background];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled || isLoading}
      style={({ pressed }) => [
        styles.base,
        fullWidth ? styles.fullWidth : styles.wrapContent,
        { backgroundColor },
        outlined && styles.outlined,
        outlined && { borderColor: colors[palette.background] },
        pressed && !isDisabled && !isLoading && styles.pressed,
        isDisabled && styles.disabled,
        typeof style === 'object' ? style : null,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={tone} />
      ) : (
        <Text style={[styles.label, { color: tone }]}>{label}</Text>
      )}
    </Pressable>
  );
}

export const Button = memo(ButtonComponent);
