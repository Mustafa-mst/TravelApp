import { memo } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { ArrowDownMiniIcon, ArrowUpMiniIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import type { DropdownItem } from "@shared/types";
import { styles } from "./DropdownInput.styles";

type DropdownInputProps = {
  label?: string;
  error?: string;
  selectedItem?: DropdownItem;
  dropdownPlaceholder?: DropdownItem;
  onPressDropdown: () => void;
  isOpen?: boolean;
} & TextInputProps;

function DropdownInputComponent({
  label,
  error,
  selectedItem,
  dropdownPlaceholder = { label: "Select" },
  onPressDropdown,
  isOpen = false,
  value,
  onChangeText,
  style,
  ...rest
}: DropdownInputProps) {
  const shown = selectedItem ?? dropdownPlaceholder;
  const isPlaceholder = !selectedItem;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, !!error && styles.inputWrapperError]}>
        <Pressable style={styles.dropdown} onPress={onPressDropdown}>
          {shown.icon}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.dropdownLabel,
                isPlaceholder && styles.placeholder,
              ]}
            >
              {shown.label}
            </Text>
            {isOpen ? (
              <ArrowUpMiniIcon width={24} height={24} />
            ) : (
              <ArrowDownMiniIcon width={24} height={24} />
            )}
          </View>
        </Pressable>

        <View style={styles.divider} />

        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, !!value && styles.inputFilled, style]}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export const DropdownInput = memo(DropdownInputComponent);
