import { memo, useState } from "react";
import { type LayoutRectangle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import { UNDERLINE_GRADIENT, styles } from "./SegmentedControl.styles";

export type SegmentOption<T extends string = string> = {
  key: T;
  label: string;
};

export type SegmentedControlProps<T extends string = string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (key: T) => void;
};

function SegmentedControlComponent<T extends string = string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const [layouts, setLayouts] = useState<Record<string, LayoutRectangle>>({});

  const activeLayout = layouts[value];

  const underlineStyle = useAnimatedStyle(() => {
    if (!activeLayout) {
      return { opacity: 0 };
    }
    return {
      opacity: withTiming(1, { duration: 120 }),
      width: withTiming(activeLayout.width, { duration: 220 }),
      transform: [
        { translateX: withTiming(activeLayout.x, { duration: 220 }) },
      ],
    };
  }, [activeLayout]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.map((option) => {
          const active = option.key === value;
          return (
            <View
              key={option.key}
              onLayout={(event) => {
                const { layout } = event.nativeEvent;
                setLayouts((prev) => ({ ...prev, [option.key]: layout }));
              }}
            >
              <PressableScale
                onPress={() => onChange(option.key)}
                style={styles.segment}
              >
                <Text
                  variant="h6"
                  style={active ? styles.labelActive : styles.label}
                >
                  {option.label}
                </Text>
              </PressableScale>
            </View>
          );
        })}
      </View>

      <Animated.View style={[styles.underlineTrack, underlineStyle]}>
        <LinearGradient
          colors={UNDERLINE_GRADIENT.colors}
          locations={UNDERLINE_GRADIENT.locations}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.underlineFill}
        />
      </Animated.View>
    </View>
  );
}

export const SegmentedControl = memo(
  SegmentedControlComponent,
) as typeof SegmentedControlComponent;
