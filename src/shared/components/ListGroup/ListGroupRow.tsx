import { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { ChevronRightIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import {
  CHEVRON_RIGHT_ROTATION,
  useCollapsibleContent,
} from "../Accordion";
import { Text } from "../Text";
import { PressableScale } from "../PressableScale";
import { listGroupStyles } from "./ListGroup.styles";
import type { ListGroupRowProps } from "./listGroup.types";

// chevron_right draws into ~6 of its 24 units, so it needs the same box as the
// prefix icons to read at the same weight.
const CHEVRON_SIZE = 20;
const PREFIX_ICON_SIZE = 20;

function ListGroupRowComponent({ item, isOpen, onToggle }: ListGroupRowProps) {
  const {
    key,
    title,
    description,
    Icon,
    iconColor,
    suffix,
    content,
    onPress,
    disabled,
  } = item;
  const styles = useStyles(listGroupStyles);
  const colors = useThemeColors();
  const { contentStyle, indicatorStyle, onMeasure } = useCollapsibleContent(
    isOpen,
    CHEVRON_RIGHT_ROTATION,
  );

  const isExpandable = content !== undefined;

  const chevron = (
    <ChevronRightIcon
      width={CHEVRON_SIZE}
      height={CHEVRON_SIZE}
      color={colors.muted}
    />
  );

  return (
    <View style={disabled ? styles.disabled : null}>
      <PressableScale
        style={styles.row}
        onPress={isExpandable ? () => onToggle(key) : onPress}
        disabled={disabled || (!onPress && !isExpandable)}
      >
        {Icon ? (
          <Icon
            width={PREFIX_ICON_SIZE}
            height={PREFIX_ICON_SIZE}
            color={iconColor ?? colors.foreground}
          />
        ) : null}
        <View style={styles.info}>
          <Text variant="bodyLargeMedium">{title}</Text>
          {description ? (
            <Text variant="body" color="muted">
              {description}
            </Text>
          ) : null}
        </View>
        {suffix ??
          (isExpandable ? (
            <Animated.View style={indicatorStyle}>{chevron}</Animated.View>
          ) : (
            chevron
          ))}
      </PressableScale>

      {/* pointerEvents: the measured copy is absolute, so a clipped wrapper
          alone does not stop it taking touches while collapsed. */}
      {isExpandable ? (
        <Animated.View
          style={[styles.contentWrapper, contentStyle]}
          pointerEvents={isOpen ? "auto" : "none"}
        >
          <View style={styles.contentMeasure} onLayout={onMeasure}>
            <View style={styles.contentInner}>{content}</View>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
}

export const ListGroupRow = memo(ListGroupRowComponent);
