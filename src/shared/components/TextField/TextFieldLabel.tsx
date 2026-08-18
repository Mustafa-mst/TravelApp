import { memo } from "react";
import { View, type StyleProp, type TextStyle } from "react-native";

import { Text } from "../Text";
import { styles } from "./TextField.styles";

type TextFieldLabelProps = {
  label: string;
  isRequired: boolean;
  isInvalid: boolean;
  style?: StyleProp<TextStyle>;
};

function TextFieldLabelComponent({
  label,
  isRequired,
  isInvalid,
  style,
}: TextFieldLabelProps) {
  return (
    <View style={styles.labelRow}>
      <Text
        variant="caption"
        color={isInvalid ? "danger" : "textMuted"}
        style={style}
      >
        {label}
      </Text>
      {isRequired ? (
        <Text variant="caption" color="danger">
          {" *"}
        </Text>
      ) : null}
    </View>
  );
}

export const TextFieldLabel = memo(TextFieldLabelComponent);
