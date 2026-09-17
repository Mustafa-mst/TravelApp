import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStyles, useThemeColors } from "@shared/hooks";
import { bottomTabBarStyles } from "./BottomTabBar.styles";
import { TabBarItem } from "./TabBarItem";

const TAB_ICON_SIZE = 24;

export function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const styles = useStyles(bottomTabBarStyles);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          typeof options.title === "string" ? options.title : route.name;
        const color = isFocused
          ? colors.tabBarIconActive
          : colors.tabBarIconInactive;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarItem
            key={route.key}
            label={label}
            color={color}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={options.tabBarIcon?.({
              focused: isFocused,
              color,
              size: TAB_ICON_SIZE,
            })}
          />
        );
      })}
    </View>
  );
}
