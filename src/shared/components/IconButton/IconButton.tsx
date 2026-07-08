import { memo, type ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { styles } from './IconButton.styles';

type IconButtonVariant = 'plain' | 'filled';

type IconButtonProps = {
  icon: ReactNode;
  variant?: IconButtonVariant;
} & Omit<PressableProps, 'children'>;

function IconButtonComponent({
  icon,
  variant = 'plain',
  disabled,
  style,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'filled' && styles.filled,
        pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'object' ? style : null,
      ]}
      {...rest}
    >
      {icon}
    </Pressable>
  );
}

export const IconButton = memo(IconButtonComponent);
