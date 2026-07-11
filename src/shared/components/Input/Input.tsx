import { memo, type ReactNode } from "react";
import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { CloseIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { IconButton } from "../IconButton";
import { styles } from "./Input.styles";

type InputProps = {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

function InputComponent({
  label,
  error,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  style,
  containerStyle,
  ...rest
}: InputProps) {
  const showClear = !rightIcon && !!value;

  return (
    <View style={[styles.container]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          !!error && styles.inputWrapperError,
          containerStyle,
        ]}
      >
        {leftIcon ? (
          <IconButton icon={leftIcon} onPress={() => onChangeText?.("")} />
        ) : null}
        <TextInput
          placeholderTextColor={colors.textTertiary}
          style={[styles.input, !!value && styles.inputFilled, style]}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
        {rightIcon}
        {showClear ? (
          <IconButton
            icon={<CloseIcon width={16} height={16} />}
            onPress={() => onChangeText?.("")}
          />
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export const Input = memo(InputComponent);
