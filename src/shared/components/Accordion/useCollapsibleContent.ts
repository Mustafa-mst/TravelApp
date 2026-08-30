import { useCallback, useEffect } from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const COLLAPSE_SPRING = {
  damping: 20,
  stiffness: 180,
  mass: 0.6,
};

/** Closed → open angles for a chevron that starts pointing down. */
export const CHEVRON_DOWN_ROTATION: [number, number] = [0, -180];

/** Same, for one that starts pointing right and swings up. */
export const CHEVRON_RIGHT_ROTATION: [number, number] = [0, -90];

/**
 * Height-collapse animation for expandable rows. The content is measured off
 * an absolutely positioned copy, so the wrapper can animate to a known height.
 */
export function useCollapsibleContent(
  isOpen: boolean,
  rotation: [number, number] = CHEVRON_DOWN_ROTATION,
) {
  const progress = useSharedValue(isOpen ? 1 : 0);
  const measured = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(isOpen ? 1 : 0, COLLAPSE_SPRING);
  }, [isOpen, progress]);

  const contentStyle = useAnimatedStyle(() => ({
    height: progress.value * measured.value,
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.value, [0, 1], rotation)}deg`,
      },
    ],
  }));

  const onMeasure = useCallback(
    (event: LayoutChangeEvent) => {
      measured.value = event.nativeEvent.layout.height;
    },
    [measured],
  );

  return { contentStyle, indicatorStyle, onMeasure };
}
