import { memo, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import {
  ACTIVE_SEGMENT_WIDTH,
  INACTIVE_SEGMENT_WIDTH,
  styles,
} from "./Carousel.styles";

type ProgressSegmentProps = {
  isActive: boolean;
  isFilled: boolean;
  duration: number;
  isPaused: boolean;
  onComplete: () => void;
};

function ProgressSegmentComponent({
  isActive,
  isFilled,
  duration,
  isPaused,
  onComplete,
}: ProgressSegmentProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const valueRef = useRef(0);
  const wasActiveRef = useRef(false);

  // An inactive segment is either fully filled (already seen) or empty.
  useEffect(() => {
    if (isActive) {
      return;
    }
    wasActiveRef.current = false;
    progress.stopAnimation();
    progress.setValue(isFilled ? 1 : 0);
  }, [isActive, isFilled, progress]);

  // Drive the active segment. A segment that just became active always starts
  // empty; pause freezes it (remembering where), resume continues from there.
  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (!wasActiveRef.current) {
      wasActiveRef.current = true;
      valueRef.current = 0;
      progress.setValue(0);
    }

    if (isPaused) {
      progress.stopAnimation((value) => {
        valueRef.current = value;
      });
      return;
    }

    progress.setValue(valueRef.current);
    Animated.timing(progress, {
      toValue: 1,
      duration: duration * (1 - valueRef.current),
      useNativeDriver: false,
    }).start(({ finished }) => {
      // The bar finishing is what advances the carousel, so the slide change
      // and the bar are always in sync — no separate timer to drift.
      if (finished) {
        onComplete();
      }
    });
  }, [isActive, duration, isPaused, progress, onComplete]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        styles.segment,
        { width: isActive ? ACTIVE_SEGMENT_WIDTH : INACTIVE_SEGMENT_WIDTH },
      ]}
    >
      <Animated.View style={[styles.fill, { width }]} />
    </View>
  );
}

export const ProgressSegment = memo(ProgressSegmentComponent);
