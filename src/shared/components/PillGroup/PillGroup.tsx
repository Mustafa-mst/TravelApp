import { memo } from "react";
import { Pressable, ScrollView } from "react-native";

import { Text } from "../Text";
import { styles } from "./PillGroup.styles";

export type PillOption<T extends string = string> = {
  key: T;
  label: string;
};

export type PillGroupVariant = "outlined" | "borderless";

export type PillGroupProps<T extends string = string> = {
  options: PillOption<T>[];
  value: T;
  onChange: (key: T) => void;
  variant?: PillGroupVariant;
};

function PillGroupComponent<T extends string = string>({
  options,
  value,
  onChange,
  variant = "outlined",
}: PillGroupProps<T>) {
  const borderless = variant === "borderless";
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((option) => {
        const active = option.key === value;
        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            style={({ pressed }) => [
              styles.pill,
              borderless && !active && styles.pillBorderless,
              active && styles.pillActive,
              pressed && styles.pillPressed,
            ]}
          >
            <Text
              variant="bodyMedium"
              style={active ? styles.labelActive : styles.label}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export const PillGroup = memo(PillGroupComponent) as typeof PillGroupComponent;
