import { memo } from "react";
import { TextInput, View } from "react-native";

import { Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { CurrencySelector } from "../CurrencySelector";
import { converterRowStyles } from "./ConverterRow.styles";

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
  const styles = useStyles(converterRowStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.row}>
      <View style={styles.fields}>
        <Text variant="caption" color="muted">
          {label}
        </Text>
        <TextInput
          style={styles.amountInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="0"
          placeholderTextColor={colors.fieldPlaceholder}
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
