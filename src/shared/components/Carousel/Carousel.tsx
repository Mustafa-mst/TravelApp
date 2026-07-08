import { useCallback, type ReactElement } from "react";
import { FlatList, View, type ListRenderItem } from "react-native";
import { useCarousel } from "@shared/hooks";
import { ProgressSegment } from "./ProgressSegment";
import { styles } from "./Carousel.styles";

type CarouselProps<T> = {
  data: T[];
  // Render just the slide content; the carousel sizes each slide to the full width.
  renderItem: (item: T, index: number) => ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  interval?: number;
};

export function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  interval = 3000,
}: CarouselProps<T>) {
  const {
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
  } = useCarousel<T>(data.length);

  const renderSlide: ListRenderItem<T> = useCallback(
    ({ item, index }) => (
      // Before the container is measured, fall back to full width so the first
      // slide fills the view; once measured, every slide snaps to the real width.
      <View style={[styles.slide, { width: width || "100%" }]}>
        {renderItem(item, index)}
      </View>
    ),
    [renderItem, width],
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <FlatList
        ref={listRef}
        data={data}
        renderItem={renderSlide}
        keyExtractor={keyExtractor ?? ((_, index) => String(index))}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      />

      <View style={styles.progress}>
        {data.map((_, index) => (
          <ProgressSegment
            key={index}
            isActive={index === activeIndex}
            isFilled={index < activeIndex}
            duration={interval}
            isPaused={isPaused}
            onComplete={goToNext}
          />
        ))}
      </View>
    </View>
  );
}
