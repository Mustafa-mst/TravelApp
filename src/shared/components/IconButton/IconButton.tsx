import { memo, type ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { useStyles } from '@shared/hooks';
import { iconButtonStyles } from './IconButton.styles';

type IconButtonVariant = 'plain' | 'filled';

type IconButtonProps = {
  icon: ReactNode;
  variant?: IconButtonVariant;
  rounded?: boolean;
} & Omit<PressableProps, 'children'>;

function IconButtonComponent({
  icon,
  variant = 'plain',
  rounded = false,
  disabled,
  style,
  ...rest
}: IconButtonProps) {
  const styles = useStyles(iconButtonStyles);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'filled' && styles.filled,
        rounded && styles.rounded,
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
