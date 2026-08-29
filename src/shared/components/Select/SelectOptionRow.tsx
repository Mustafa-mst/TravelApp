import { memo } from "react";
import { View } from "react-native";

import { CheckIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import { FieldIcon } from "../TextField/FieldIcon";
import { selectStyles } from "./Select.styles";
import {
  SELECT_ITEM_INDICATOR_SIZE,
  SELECT_PRESS_SCALE,
} from "./select.constants";
import type { SelectOption } from "./select.types";

type SelectOptionRowProps = {
  option: SelectOption;
  isSelected: boolean;
  onPress: (option: SelectOption) => void;
};

function SelectOptionRowComponent({
  option,
  isSelected,
  onPress,
}: SelectOptionRowProps) {
  const styles = useStyles(selectStyles);
  const colors = useThemeColors();

  return (
    <PressableScale
      scaleTo={SELECT_PRESS_SCALE}
      activeOpacity={1}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected, disabled: option.isDisabled }}
      disabled={option.isDisabled}
      containerStyle={styles.rowContainer}
      style={[styles.row, option.isDisabled && styles.disabled]}
      pressedStyle={styles.rowPressed}
      onPress={() => onPress(option)}
    >
      {option.Icon ? <FieldIcon icon={option.Icon} /> : null}

      <View style={styles.rowContent}>
        <Text variant="bodyLargeMedium">{option.label}</Text>
        {option.description ? (
          <Text variant="body" color="muted" numberOfLines={2}>
            {option.description}
          </Text>
        ) : null}
      </View>

      <View style={styles.indicatorSlot}>
        {isSelected ? (
          <CheckIcon
            width={SELECT_ITEM_INDICATOR_SIZE}
            height={SELECT_ITEM_INDICATOR_SIZE}
            color={colors.accent}
          />
        ) : null}
      </View>
    </PressableScale>
  );
}

export const SelectOptionRow = memo(SelectOptionRowComponent);
