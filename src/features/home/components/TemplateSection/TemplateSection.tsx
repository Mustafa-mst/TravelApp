import { memo, useCallback } from "react";

import { StaticList } from "@shared/components";
import { TemplateCard, type TemplateCardType } from "@/features/itinerary";
import { styles } from "./TemplateSection.styles";

export type TemplateSectionProps = {
  templates: TemplateCardType[];
  onSelect?: (template: TemplateCardType) => void;
};

function TemplateSectionComponent({
  templates,
  onSelect,
}: TemplateSectionProps) {
  const renderItem = useCallback(
    ({ item: template }: { item: TemplateCardType }) => (
      <TemplateCard
        title={template.title ?? ""}
        placesCount={template.places_count ?? 0}
        daysCount={template.days_count ?? 0}
        placeTypes={template.place_types}
        coverPhoto={template.cover_photo}
        onPress={() => onSelect?.(template)}
      />
    ),
    [onSelect],
  );

  const keyExtractor = useCallback(
    (template: TemplateCardType, index: number) => template.id ?? String(index),
    [],
  );

  return (
    <StaticList
      data={templates || []}
      style={styles.list}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

export const TemplateSection = memo(TemplateSectionComponent);
