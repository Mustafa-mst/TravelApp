import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { CloseIcon, SearchIcon } from "@/shared/assets/icons";
import { COLLAPSED_SIZE, styles } from "./SheetSearchHeader.styles";

type SheetSearchHeaderProps = {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const ANIMATION_DURATION = 250;

/**
 * Sheet header with the title on the left and a circular search button on the
 * right. Pressing the button animates the circle leftward into a full-width
 * text input (height stays fixed); pressing again collapses and clears it.
 */
function SheetSearchHeaderComponent({
  title,
  value,
  onChangeText,
  placeholder,
}: SheetSearchHeaderProps) {
  const [rowWidth, setRowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const prevValue = useRef(value);
  const progress = useSharedValue(0);

  const pillStyle = useAnimatedStyle(() => ({
    width:
      COLLAPSED_SIZE + progress.value * Math.max(rowWidth - COLLAPSED_SIZE, 0),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const collapse = useCallback(() => {
    inputRef.current?.blur();
    setIsOpen(false);
    progress.value = withTiming(0, { duration: ANIMATION_DURATION });
  }, [progress]);

  const expand = useCallback(() => {
    setIsOpen(true);
    // Focus once the pill has fully expanded, driven by the animation itself
    // instead of a parallel timer.
    progress.value = withTiming(
      1,
      { duration: ANIMATION_DURATION },
      (finished) => {
        if (finished) {
          scheduleOnRN(focusInput);
        }
      },
    );
  }, [focusInput, progress]);

  const toggle = () => {
    if (isOpen) {
      onChangeText("");
      collapse();
    } else {
      expand();
    }
  };

  // The sheet clears the query when it closes; fold the pill back so it
  // doesn't reopen in the expanded state.
  useEffect(() => {
    const wasCleared = prevValue.current !== "" && value === "";
    prevValue.current = value;
    if (wasCleared && isOpen && !inputRef.current?.isFocused()) {
      collapse();
    }
  }, [value, isOpen, collapse]);

  return (
    <View
      style={styles.row}
      onLayout={(event) => {
        const next = event.nativeEvent.layout.width;
        setRowWidth((current) => (current === next ? current : next));
      }}
    >
      <Animated.View style={titleStyle}>
        <Text variant="h5">{title}</Text>
      </Animated.View>

      <Animated.View style={[styles.pill, pillStyle]}>
        {isOpen ? (
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            autoCapitalize="characters"
            autoCorrect={false}
            onBlur={() => {
              // Fold back when focus is lost with nothing typed (e.g. the
              // sheet was dismissed before searching).
              if (!value) {
                collapse();
              }
            }}
          />
        ) : null}
        <Pressable style={styles.iconButton} onPress={toggle} hitSlop={8}>
          {isOpen ? (
            <CloseIcon width={18} height={18} color={colors.iconSecondary} />
          ) : (
            <SearchIcon
              width={18}
              height={18}
              fill="none"
              stroke={colors.iconPrimary}
              strokeWidth={1.8}
            />
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}

export const SheetSearchHeader = memo(SheetSearchHeaderComponent);
