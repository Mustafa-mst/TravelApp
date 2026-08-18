import { memo, useCallback } from "react";
import { View, type LayoutChangeEvent } from "react-native";

import { useStyles, useThemeColors } from "@shared/hooks";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import { tabsStyles, tabsVariants } from "./Tabs.styles";
import type { TabOption, TabsVariant } from "./tabs.types";

type TabTriggerProps = {
  option: TabOption;
  variant: TabsVariant;
  isActive: boolean;
  stretch: boolean;
  onPress: (key: string) => void;
  onMeasure: (key: string, layout: LayoutChangeEvent["nativeEvent"]["layout"]) => void;
};

function TabTriggerComponent({
  option,
  variant,
  isActive,
  stretch,
  onPress,
  onMeasure,
}: TabTriggerProps) {
  const styles = useStyles(tabsStyles);
  const variants = useStyles(tabsVariants);
  const colors = useThemeColors();

  const { key, label, Icon, disabled } = option;
  const palette = variants[variant];
  const tone = isActive ? palette.labelActive : palette.label;

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onMeasure(key, event.nativeEvent.layout);
    },
    [key, onMeasure],
  );

  const handlePress = useCallback(() => {
    onPress(key);
  }, [key, onPress]);

  return (
    <View onLayout={handleLayout} style={stretch && styles.triggerStretch}>
      <PressableScale
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled }}
        disabled={disabled}
        onPress={handlePress}
        style={[styles.trigger, palette.trigger, disabled && styles.disabled]}
      >
        {Icon ? <Icon width={18} height={18} color={colors[tone]} /> : null}
        <Text variant={isActive ? "bodySemiBold" : "bodyMedium"} color={tone}>
          {label}
        </Text>
      </PressableScale>
    </View>
  );
}

export const TabTrigger = memo(TabTriggerComponent);
