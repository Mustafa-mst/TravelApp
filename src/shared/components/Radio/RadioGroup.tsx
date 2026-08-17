import { memo, useCallback } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { Radio } from "./Radio";
import { styles } from "./Radio.styles";
import type {
  RadioGroupOrientation,
  RadioOption,
  RadioVariant,
} from "./radio.types";

type RadioGroupProps<T extends string = string> = {
  options: RadioOption<T>[];
  value?: T;
  onValueChange: (key: T) => void;
  variant?: RadioVariant;
  orientation?: RadioGroupOrientation;
  isDisabled?: boolean;
  isInvalid?: boolean;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

function RadioGroupComponent<T extends string = string>({
  options,
  value,
  onValueChange,
  variant = "primary",
  orientation = "vertical",
  isDisabled = false,
  isInvalid = false,
  animated = true,
  style,
}: RadioGroupProps<T>) {
  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        styles.group,
        orientation === "horizontal" && styles.groupHorizontal,
        style,
      ]}
    >
      {options.map((option) => (
        <RadioGroupItem
          key={option.key}
          option={option}
          isSelected={option.key === value}
          variant={variant}
          isDisabled={isDisabled || option.disabled === true}
          isInvalid={isInvalid}
          animated={animated}
          onSelect={onValueChange}
        />
      ))}
    </View>
  );
}

type RadioGroupItemProps<T extends string> = {
  option: RadioOption<T>;
  isSelected: boolean;
  variant: RadioVariant;
  isDisabled: boolean;
  isInvalid: boolean;
  animated: boolean;
  onSelect: (key: T) => void;
};

function RadioGroupItem<T extends string>({
  option,
  isSelected,
  variant,
  isDisabled,
  isInvalid,
  animated,
  onSelect,
}: RadioGroupItemProps<T>) {
  const handleSelectedChange = useCallback(() => {
    onSelect(option.key);
  }, [onSelect, option.key]);

  return (
    <Radio
      label={option.label}
      description={option.description}
      isSelected={isSelected}
      onSelectedChange={handleSelectedChange}
      variant={variant}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      animated={animated}
    />
  );
}

export const RadioGroup = memo(RadioGroupComponent) as typeof RadioGroupComponent;
