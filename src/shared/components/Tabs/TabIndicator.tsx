import { memo } from "react";
import type { LayoutRectangle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useStyles } from "@shared/hooks";
import { tabsStyles, tabsVariants } from "./Tabs.styles";
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
  const styles = useStyles(tabsStyles);
  const variants = useStyles(tabsVariants);

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
        variants[variant].indicator,
        indicatorStyle,
      ]}
    />
  );
}

export const TabIndicator = memo(TabIndicatorComponent);
