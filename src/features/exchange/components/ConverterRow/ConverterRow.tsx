import { memo } from "react";
import { TextInput, View } from "react-native";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { CurrencySelector } from "../CurrencySelector";
import { styles } from "./ConverterRow.styles";

type ConverterRowProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  flagUri?: string;
  code?: string;
  onPressCurrency: () => void;
};

function ConverterRowComponent({
  label,
  value,
  onChangeText,
  flagUri,
  code,
  onPressCurrency,
}: ConverterRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.fields}>
        <Text variant="caption" color="textMuted">
          {label}
        </Text>
        <TextInput
          style={styles.amountInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="0"
          placeholderTextColor={colors.textTertiary}
          keyboardType="numeric"
        />
      </View>
      <CurrencySelector
        flagUri={flagUri}
        code={code}
        onPress={onPressCurrency}
      />
    </View>
  );
}

export const ConverterRow = memo(ConverterRowComponent);
