import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { MinusIcon, PlusIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { quantityInputStyles } from "./QuantityInput.styles";

type QuantityInputProps = {
  value: number;
  label?: string;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
};

function QuantityInputComponent({
  value,
  label,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  onChange,
}: QuantityInputProps) {
  const styles = useStyles(quantityInputStyles);
  const colors = useThemeColors();

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.fieldWrapper}>
        <Pressable
          accessibilityRole="button"
          disabled={!canDecrement}
          hitSlop={10}
          style={[styles.button, !canDecrement && styles.buttonDisabled]}
          onPress={() => onChange(value - 1)}
        >
          <MinusIcon width={20} height={20} color={colors.foreground} />
        </Pressable>

        <View style={styles.countBadge}>
          <Text style={styles.count}>{value}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={!canIncrement}
          hitSlop={10}
          style={[styles.button, !canIncrement && styles.buttonDisabled]}
          onPress={() => onChange(value + 1)}
        >
          <PlusIcon width={20} height={20} color={colors.foreground} />
        </Pressable>
      </View>
    </View>
  );
}

export const QuantityInput = memo(QuantityInputComponent);
