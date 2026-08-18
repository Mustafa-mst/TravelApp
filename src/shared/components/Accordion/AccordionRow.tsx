import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ChevronDownIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import {
  CHEVRON_SIZE,
  CONTENT_SPRING,
  INDICATOR_ROTATION,
  LEADING_ICON_SIZE,
  styles,
} from "./Accordion.styles";
import { type AccordionRowProps } from "./accordion.types";

export function AccordionRow({
  item,
  isOpen,
  isSurface,
  isDisabled,
  onPress,
}: AccordionRowProps) {
  const progress = useSharedValue(isOpen ? 1 : 0);
  const measured = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(isOpen ? 1 : 0, CONTENT_SPRING);
  }, [isOpen, progress]);

  const contentStyle = useAnimatedStyle(() => ({
    height: progress.value * measured.value,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          progress.value,
          [0, 1],
          INDICATOR_ROTATION,
        )}deg`,
      },
    ],
  }));

  const { Icon } = item;

  return (
    <View style={isDisabled ? styles.disabled : null}>
      <PressableScale
        scaleTo={1}
        activeOpacity={0.6}
        disabled={isDisabled}
        onPress={() => onPress(item.key)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
        style={[styles.trigger, isSurface && styles.triggerSurface]}
      >
        {Icon ? (
          <Icon
            width={LEADING_ICON_SIZE}
            height={LEADING_ICON_SIZE}
            color={colors.iconSecondary}
          />
        ) : null}

        <View style={styles.info}>
          <Text variant="bodyLargeMedium">{item.title}</Text>
          {item.subtitle ? (
            <Text
              variant="body"
              color="textSecondary"
              style={styles.subtitle}
            >
              {item.subtitle}
            </Text>
          ) : null}
        </View>

        <Animated.View style={chevronStyle}>
          <ChevronDownIcon
            width={CHEVRON_SIZE}
            height={CHEVRON_SIZE}
            color={colors.iconTertiary}
          />
        </Animated.View>
      </PressableScale>

      <Animated.View style={[styles.contentWrapper, contentStyle]}>
        <View
          style={styles.contentMeasure}
          onLayout={(event) => {
            measured.value = event.nativeEvent.layout.height;
          }}
        >
          <View
            style={[
              styles.contentInner,
              isSurface && styles.contentInnerSurface,
            ]}
          >
            {typeof item.content === "string" ? (
              <Text variant="body" color="textSecondary">
                {item.content}
              </Text>
            ) : (
              item.content
            )}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
