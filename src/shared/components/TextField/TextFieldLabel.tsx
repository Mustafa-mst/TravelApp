import { memo } from "react";
import { View, type StyleProp, type TextStyle } from "react-native";

import { useStyles } from "@shared/hooks";
import { Text } from "../Text";
import { textFieldStyles } from "./TextField.styles";

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
  const styles = useStyles(textFieldStyles);

  return (
    <View style={[styles.labelRow, isDisabled && styles.disabled]}>
      <Text
        variant="bodyLargeMedium"
        color={isInvalid ? "danger" : "foreground"}
        style={style}
      >
        {label}
      </Text>
      {isRequired ? (
        <Text
          variant="bodyExtraLarge"
          color={isDisabled ? "muted" : "danger"}
        >
          {" *"}
        </Text>
      ) : null}
    </View>
  );
}

export const TextFieldLabel = memo(TextFieldLabelComponent);
