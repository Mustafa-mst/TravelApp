import { memo } from "react";
import {
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTranslation } from "react-i18next";

import { StateView, Tabs } from "@shared/components";
import type { TemplateCardType } from "@/features/trip";
import { TemplateTab } from "../../constants";
import { TemplateSection } from "../TemplateSection";
import { styles } from "./ExploreTemplates.styles";

const EMPTY_LABEL_KEY = {
  [TemplateTab.MyTemplates]: "home.explore.myTemplatesEmpty",
  [TemplateTab.Explorer]: "home.explore.empty",
} as const satisfies Record<TemplateTab, string>;

export type ExploreTemplatesProps = {
  templates: TemplateCardType[];
  isLoading: boolean;
  isError: boolean;
  cardWidth: number;
  /** Index of the card the map is following. */
  activeIndex: number;
  activeTab: TemplateTab;
  onTabChange: (tab: TemplateTab) => void;
  onRetry: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onSelect?: (template: TemplateCardType) => void;
  /** Horizontal inset for the tabs only — the card row pages edge to edge. */
  headingStyle?: StyleProp<ViewStyle>;
};

function ExploreTemplatesComponent({
  templates,
  isLoading,
  isError,
  cardWidth,
  activeIndex,
  activeTab,
  onTabChange,
  onRetry,
  onScroll,
  onSelect,
  headingStyle,
}: ExploreTemplatesProps) {
  const { t } = useTranslation();

  const tabs = [
    { key: TemplateTab.Explorer, label: t("home.explore.tabs.explorer") },
    { key: TemplateTab.MyTemplates, label: t("home.explore.tabs.myTemplates") },
  ];

  return (
    <View style={styles.container}>
      <View style={headingStyle}>
        <Tabs
          options={tabs}
          value={activeTab}
          onChange={onTabChange}
          variant="primary"
        />
      </View>

      <StateView
        isLoading={isLoading}
        isError={isError}
        isEmpty={templates.length === 0}
        error={{ label: t("home.explore.error"), onRetry }}
        empty={{ label: t(EMPTY_LABEL_KEY[activeTab]) }}
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
