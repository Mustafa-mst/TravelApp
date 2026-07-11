import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./BottomTabBar.styles";

interface TabBarItemProps {
  label: string;
  icon: ReactNode;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export function TabBarItem({
  label,
  icon,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.item,
        isFocused && styles.itemActive,
        pressed && styles.pressed,
      ]}
    >
      {icon}
      <Text
        numberOfLines={1}
        style={[styles.label, isFocused && styles.labelActive]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
