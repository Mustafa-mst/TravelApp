import { memo } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { DOT_GAP, DOT_SIZE, styles } from "./Carousel.styles";

type DotsProps = {
  count: number;
  activeIndex: number;
};

function DotsComponent({ count, activeIndex }: DotsProps) {
  const highlightStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(activeIndex * (DOT_SIZE + DOT_GAP), {
          duration: 250,
        }),
      },
    ],
  }));

  return (
    <View style={styles.dots}>
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={styles.dot} />
      ))}
      <Animated.View style={[styles.activeDot, highlightStyle]} />
    </View>
  );
}

export const Dots = memo(DotsComponent);
