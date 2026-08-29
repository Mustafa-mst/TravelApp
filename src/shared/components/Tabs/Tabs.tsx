import { Fragment, memo, useCallback } from "react";
import {
  ScrollView,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useStyles } from "@shared/hooks";
import { TabIndicator } from "./TabIndicator";
import { TabTrigger } from "./TabTrigger";
import { tabsStyles, tabsVariants } from "./Tabs.styles";
import { useTabsIndicator } from "./useTabsIndicator";
import type { TabOption, TabsScrollAlign, TabsVariant } from "./tabs.types";

type TabsProps<T extends string = string> = {
  options: TabOption<T>[];
  value: T;
  onChange: (key: T) => void;
  variant?: TabsVariant;
  /** Horizontal scrolling for tab rows that overflow their container. */
  scrollable?: boolean;
  /** Where the active tab lands after an auto-scroll. Ignored unless scrollable. */
  scrollAlign?: TabsScrollAlign;
  /** Splits the available width evenly between tabs. Ignored when scrollable. */
  fullWidth?: boolean;
  separators?: boolean;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

function TabsComponent<T extends string = string>({
  options,
  value,
  onChange,
  variant = "primary",
  scrollable = false,
  scrollAlign = "center",
  fullWidth = false,
  separators = false,
  animated = true,
  style,
}: TabsProps<T>) {
  const styles = useStyles(tabsStyles);
  const variants = useStyles(tabsVariants);
  const { scrollRef, activeLayout, measureTab, onViewportLayout } =
    useTabsIndicator(value, scrollable ? scrollAlign : "none");

  const stretch = fullWidth && !scrollable;

  const handlePress = useCallback(
    (key: string) => {
      onChange(key as T);
    },
    [onChange],
  );

  const row = (
    <View
      accessibilityRole="tablist"
      style={[styles.row, variants[variant].list, stretch && styles.rowStretch]}
    >
      <TabIndicator layout={activeLayout} variant={variant} animated={animated} />
      {options.map((option, index) => (
        <Fragment key={option.key}>
          {separators && index > 0 ? (
            <View style={styles.separator} />
          ) : null}
          <TabTrigger
            option={option}
            variant={variant}
            isActive={option.key === value}
            stretch={stretch}
            onPress={handlePress}
            onMeasure={measureTab}
          />
        </Fragment>
      ))}
    </View>
  );

  if (!scrollable) {
    return (
      <View style={[styles.container, stretch && styles.fullWidth, style]}>
        {row}
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={onViewportLayout}
      style={[styles.container, style]}
    >
      {row}
    </ScrollView>
  );
}

export const Tabs = memo(TabsComponent) as typeof TabsComponent;
