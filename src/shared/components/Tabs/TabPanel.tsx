import { memo, type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { styles } from "./Tabs.styles";

export type TabPanelProps = {
  value: string;
  activeValue: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function TabPanelComponent({
  value,
  activeValue,
  children,
  style,
}: TabPanelProps) {
  if (value !== activeValue) {
    return null;
  }

  return (
    <View style={[styles.panel, style]}>{children}</View>
  );
}

export const TabPanel = memo(TabPanelComponent);
