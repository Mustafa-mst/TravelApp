import type { ReactNode } from "react";
import { Pressable } from "react-native";
import { Text } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { bottomTabBarStyles } from "./BottomTabBar.styles";

type TabBarItemProps = {
  label: string;
  icon: ReactNode;
  color: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export function TabBarItem({
  label,
  icon,
  color,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const styles = useStyles(bottomTabBarStyles);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      {icon}
      <Text variant={isFocused ? "captionMedium" : "caption"} color={color}>
        {label}
      </Text>
    </Pressable>
  );
}
