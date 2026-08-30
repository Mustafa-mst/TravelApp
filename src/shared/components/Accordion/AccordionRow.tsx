import { View } from "react-native";
import Animated from "react-native-reanimated";

import { ChevronDownIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import {
  accordionStyles,
  CHEVRON_SIZE,
  LEADING_ICON_SIZE,
} from "./Accordion.styles";
import { type AccordionRowProps } from "./accordion.types";
import { useCollapsibleContent } from "./useCollapsibleContent";

export function AccordionRow({
  item,
  isOpen,
  isSurface,
  isDisabled,
  onPress,
}: AccordionRowProps) {
  const styles = useStyles(accordionStyles);
  const colors = useThemeColors();

  const { contentStyle, indicatorStyle, onMeasure } =
    useCollapsibleContent(isOpen);

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
            color={colors.muted}
          />
        ) : null}

        <View style={styles.info}>
          <Text variant="bodyLargeMedium">{item.title}</Text>
          {item.subtitle ? (
            <Text
              variant="body"
              color="muted"
              style={styles.subtitle}
            >
              {item.subtitle}
            </Text>
          ) : null}
        </View>

        <Animated.View style={indicatorStyle}>
          <ChevronDownIcon
            width={CHEVRON_SIZE}
            height={CHEVRON_SIZE}
            color={colors.muted}
          />
        </Animated.View>
      </PressableScale>

      <Animated.View style={[styles.contentWrapper, contentStyle]}>
        <View
          style={styles.contentMeasure}
          onLayout={onMeasure}
        >
          <View
            style={[
              styles.contentInner,
              isSurface && styles.contentInnerSurface,
            ]}
          >
            {typeof item.content === "string" ? (
              <Text variant="body" color="muted">
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
