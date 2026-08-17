import { memo } from "react";
import type { LayoutRectangle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { styles, tabsVariants } from "./Tabs.styles";
import { INDICATOR_FADE_MS, INDICATOR_SPRING } from "./tabs.constants";
import type { TabsVariant } from "./tabs.types";

type TabIndicatorProps = {
  layout?: LayoutRectangle;
  variant: TabsVariant;
  animated: boolean;
};

function TabIndicatorComponent({
  layout,
  variant,
  animated,
}: TabIndicatorProps) {
  const indicatorStyle = useAnimatedStyle(() => {
    if (!layout) {
      return { opacity: 0 };
    }

    if (!animated) {
      return {
        opacity: 1,
        width: layout.width,
        transform: [{ translateX: layout.x }],
      };
    }

    return {
      opacity: withTiming(1, { duration: INDICATOR_FADE_MS }),
      width: withSpring(layout.width, INDICATOR_SPRING),
      transform: [{ translateX: withSpring(layout.x, INDICATOR_SPRING) }],
    };
  }, [layout, animated]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.indicator,
        tabsVariants[variant].indicator,
        indicatorStyle,
      ]}
    />
  );
}

export const TabIndicator = memo(TabIndicatorComponent);
