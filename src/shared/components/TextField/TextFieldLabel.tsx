import { memo } from "react";
import { View, type StyleProp, type TextStyle } from "react-native";

import { Text } from "../Text";
import { styles } from "./TextField.styles";

type TextFieldLabelProps = {
  label: string;
  isRequired: boolean;
  isInvalid: boolean;
  isDisabled: boolean;
  style?: StyleProp<TextStyle>;
};

function TextFieldLabelComponent({
  label,
  isRequired,
  isInvalid,
  isDisabled,
  style,
}: TextFieldLabelProps) {
  return (
    <View style={[styles.labelRow, isDisabled && styles.disabled]}>
      <Text
        variant="bodyLargeMedium"
        color={isInvalid ? "danger" : "text"}
        style={style}
      >
        {label}
      </Text>
      {isRequired ? (
        <Text
          variant="bodyExtraLarge"
          color={isDisabled ? "textMuted" : "danger"}
        >
          {" *"}
        </Text>
      ) : null}
    </View>
  );
}

export const TextFieldLabel = memo(TextFieldLabelComponent);
