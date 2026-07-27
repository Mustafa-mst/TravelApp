import { memo, useState } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";

import { SegmentedControl, StateView } from "@shared/components";
import {
  useFeaturedTemplatesQuery,
  useMyTemplatesQuery,
  type TemplateCardType,
} from "@/features/itinerary";
import { TemplateSection } from "../TemplateSection";
import { styles } from "./ExploreTemplates.styles";

type TabKey = "myTemplates" | "explorer";

export type ExploreTemplatesProps = {
  onSelect?: (template: TemplateCardType) => void;
  style?: StyleProp<ViewStyle>;
};

const EMPTY_LABEL_KEY = {
  myTemplates: "home.explore.myTemplatesEmpty",
  explorer: "home.explore.empty",
} as const satisfies Record<TabKey, string>;

function ExploreTemplatesComponent({ onSelect, style }: ExploreTemplatesProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>("myTemplates");

  const myTemplates = useMyTemplatesQuery();
  const featured = useFeaturedTemplatesQuery();

  const { data, isLoading, isError, refetch } =
    activeTab === "myTemplates" ? myTemplates : featured;
  const templates = data ?? [];

  const tabs = [
    { key: "myTemplates" as const, label: t("home.explore.tabs.myTemplates") },
    { key: "explorer" as const, label: t("home.explore.tabs.explorer") },
  ];

  return (
    <View style={[styles.container, style]}>
      <SegmentedControl
        options={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />

      <StateView
        isLoading={isLoading}
        isError={isError}
        isEmpty={templates.length === 0}
        errorLabel={t("home.explore.error")}
        emptyLabel={t(EMPTY_LABEL_KEY[activeTab])}
        retryLabel={t("common.retry")}
        onRetry={refetch}
        style={styles.center}
      >
        <TemplateSection templates={templates} onSelect={onSelect} />
      </StateView>
    </View>
  );
}

export const ExploreTemplates = memo(ExploreTemplatesComponent);
