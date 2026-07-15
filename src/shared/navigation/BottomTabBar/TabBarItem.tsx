import type { ReactNode } from "react";
import { Text } from "react-native";
import { PressableScale } from "@shared/components";
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
    <PressableScale
      scaleTo={0.98}
      activeOpacity={1}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.item, isFocused && styles.itemActive]}
    >
      {icon}
      <Text
        numberOfLines={1}
        style={[styles.label, isFocused && styles.labelActive]}
      >
        {label}
      </Text>
    </PressableScale>
  );
}
