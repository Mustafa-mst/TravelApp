import { memo, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRightIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { styles } from "./SelectField.styles";

type SelectFieldProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string | null;
  /** Defaults to a chevron; pass `null` to render nothing. */
  rightIcon?: ReactNode;
  onPress: () => void;
};

function SelectFieldComponent({
  label,
  error,
  placeholder,
  value,
  rightIcon = (
    <ChevronRightIcon width={20} height={20} color={colors.iconTertiary} />
  ),
  onPress,
}: SelectFieldProps) {
  const hasValue = !!value;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.fieldWrapper, !!error && styles.fieldWrapperError]}
      >
        <Text
          numberOfLines={1}
          style={[styles.value, hasValue && styles.valueFilled]}
        >
          {hasValue ? value : placeholder}
        </Text>
        {rightIcon}
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export const SelectField = memo(SelectFieldComponent);
