import type { ReactNode } from "react";
import { PressableScale } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { bottomTabBarStyles } from "./BottomTabBar.styles";

type TabBarItemProps = {
  label: string;
  icon: ReactNode;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export function TabBarItem({
  label,
  icon,
  isFocused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const styles = useStyles(bottomTabBarStyles);

  return (
    <PressableScale
      scaleTo={0.98}
      activeOpacity={1}
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
      style={[styles.item, isFocused && styles.itemActive]}
    >
      {icon}
    </PressableScale>
  );
}
