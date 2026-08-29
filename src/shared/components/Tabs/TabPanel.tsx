import { memo, type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { useStyles } from "@shared/hooks";
import { tabsStyles } from "./Tabs.styles";

type TabPanelProps = {
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
  const styles = useStyles(tabsStyles);

  if (value !== activeValue) {
    return null;
  }

  return (
    <View style={[styles.panel, style]}>{children}</View>
  );
}

export const TabPanel = memo(TabPanelComponent);
