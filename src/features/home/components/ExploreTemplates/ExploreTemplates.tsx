import { memo } from "react";
import {
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTranslation } from "react-i18next";

import { StateView, Text } from "@shared/components";
import { brand } from "@shared/styles";
import type { TemplateCardType } from "@/features/trip";
import { TemplateSection } from "../TemplateSection";
import { styles } from "./ExploreTemplates.styles";

export type ExploreTemplatesProps = {
  templates: TemplateCardType[];
  isLoading: boolean;
  isError: boolean;
  cardWidth: number;
  /** Index of the card the map is following. */
  activeIndex: number;
  onRetry: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onSelect?: (template: TemplateCardType) => void;
  /** Horizontal inset for the title only — the card row pages edge to edge. */
  headingStyle?: StyleProp<ViewStyle>;
};

function ExploreTemplatesComponent({
  templates,
  isLoading,
  isError,
  cardWidth,
  activeIndex,
  onRetry,
  onScroll,
  onSelect,
  headingStyle,
}: ExploreTemplatesProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={headingStyle}>
        <Text variant="h4" color={brand.text.main}>
          {t("home.explore.routes")}
        </Text>
      </View>

      <StateView
        isLoading={isLoading}
        isError={isError}
        isEmpty={templates.length === 0}
        error={{ label: t("home.explore.error"), onRetry }}
        empty={{ label: t("home.explore.empty") }}
        style={styles.center}
      >
        <TemplateSection
          templates={templates}
          cardWidth={cardWidth}
          activeIndex={activeIndex}
          onScroll={onScroll}
          onSelect={onSelect}
        />
      </StateView>
    </View>
  );
}

export const ExploreTemplates = memo(ExploreTemplatesComponent);
