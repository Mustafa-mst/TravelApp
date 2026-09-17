import { memo, useCallback } from "react";
import {
  FlatList,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { TemplateCard, type TemplateCardType } from "@/features/trip";
import { templateCardWidth } from "../../constants";
import { styles } from "./TemplateSection.styles";

export type TemplateSectionProps = {
  templates: TemplateCardType[];
  /** Full row width; the card is this minus the peek of the next one. */
  cardWidth: number;
  /** Index of the card the map is following. */
  activeIndex: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onSelect?: (template: TemplateCardType) => void;
};

function TemplateSectionComponent({
  templates,
  cardWidth,
  activeIndex,
  onScroll,
  onSelect,
}: TemplateSectionProps) {
  const renderItem = useCallback(
    ({ item: template, index }: { item: TemplateCardType; index: number }) => (
      <View style={[styles.page, { width: templateCardWidth(cardWidth) }]}>
        <TemplateCard
          title={template.title ?? ""}
          placesCount={template.places_count ?? 0}
          daysCount={template.days_count ?? 0}
          placeTypes={template.place_types}
          coverPhoto={template.cover_photo}
          isActive={index === activeIndex}
          onPress={() => onSelect?.(template)}
        />
      </View>
    ),
    [cardWidth, activeIndex, onSelect],
  );

  const keyExtractor = useCallback(
    (template: TemplateCardType, index: number) => template.id ?? String(index),
    [],
  );

  return (
    <FlatList
      horizontal
      data={templates}
      snapToInterval={templateCardWidth(cardWidth)}
      snapToAlignment="start"
      contentContainerStyle={styles.content}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      extraData={activeIndex}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
}

export const TemplateSection = memo(TemplateSectionComponent);
