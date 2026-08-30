import { memo } from "react";

import { TextField } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { CurrencySelector } from "../CurrencySelector";
import { converterRowStyles } from "./ConverterRow.styles";

const AMOUNT_PLACEHOLDER = "0";

export type ConverterRowProps = {
  value: string;
  /** Omit to make the row read-only, as the converted side is. */
  onChangeText?: (text: string) => void;
  flagUri?: string;
  code?: string;
  onPressCurrency: () => void;
};

function ConverterRowComponent({
  value,
  onChangeText,
  flagUri,
  code,
  onPressCurrency,
}: ConverterRowProps) {
  const styles = useStyles(converterRowStyles);

  return (
    <TextField
      value={value}
      onChangeText={onChangeText}
      editable={Boolean(onChangeText)}
      keyboardType="decimal-pad"
      placeholder={AMOUNT_PLACEHOLDER}
      style={styles.amountInput}
      startContent={
        <CurrencySelector
          flagUri={flagUri}
          code={code}
          onPress={onPressCurrency}
        />
      }
    />
  );
}

export const ConverterRow = memo(ConverterRowComponent);
