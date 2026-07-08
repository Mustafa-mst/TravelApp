import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, type LayoutChangeEvent, type ViewToken } from "react-native";

const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

export function useCarousel<T>(length: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const listRef = useRef<FlatList<T>>(null);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      if (length <= 1) {
        return current;
      }
      listRef.current?.scrollToIndex({
        index: (current + 1) % length,
        animated: true,
      });
      // The viewability callback updates activeIndex once the scroll settles.
      return current;
    });
  }, [length]);

  // Pause whenever a finger is on the list, even a plain tap that never
  // scrolls; scroll-drag events miss taps, so key off touch events instead.
  const onTouchStart = useCallback(() => setIsPaused(true), []);
  const onTouchEnd = useCallback(() => setIsPaused(false), []);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (first?.index != null) {
        setActiveIndex(first.index);
      }
    },
  ).current;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  // Only provide getItemLayout once the width is known; a zero-width layout
  // would break FlatList's initial measurement.
  const getItemLayout = useMemo(
    () =>
      width
        ? (_: ArrayLike<T> | null | undefined, index: number) => ({
            length: width,
            offset: width * index,
            index,
          })
        : undefined,
    [width],
  );

  return {
    activeIndex,
    width,
    listRef,
    viewabilityConfig,
    onLayout,
    onViewableItemsChanged,
    getItemLayout,
    onTouchStart,
    onTouchEnd,
    isPaused,
    goToNext,
  };
}
