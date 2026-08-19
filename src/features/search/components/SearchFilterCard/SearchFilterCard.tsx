import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import {
  Accordion,
  Button,
  Text,
  type AccordionItem,
} from "@shared/components";
import {
  GlobeIcon,
  LanguageOutline,
  PeopleOutline,
} from "@shared/assets/icons";
import type { OptionsType } from "@shared/types";
import {
  getOptionList,
  getSelectedOptionLabel,
} from "@shared/utils/option";
import { FilterOption } from "./FilterOption";
import { styles } from "./SearchFilterCard.styles";
import {
  CONTINENT_OPTIONS,
  LANGUAGE_OPTIONS,
  POPULATION_OPTIONS,
} from "../../constants";
import type { SearchFilters } from "../../types";

type SearchFilterCardProps = {
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
};

const SearchFilterCardComponent = ({
  filters,
  onApply,
}: SearchFilterCardProps) => {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<SearchFilters>(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const toggle = useCallback((key: keyof SearchFilters, id: string) => {
    setDraft((current) => ({
      ...current,
      [key]: current[key] === id ? null : id,
    }));
  }, []);

  const renderOptions = useCallback(
    <T extends string>(
      options: OptionsType<T>,
      selected: T | null | undefined,
      key: keyof SearchFilters,
    ) => (
      <View>
        {getOptionList(options).map((option, index) => {
          const isSelected = option.value === selected;

          return (
            <FilterOption
              key={option.value}
              option={option}
              filterKey={key}
              isSelected={isSelected}
              isFirst={index === 0}
              onToggle={toggle}
            />
          );
        })}
      </View>
    ),
    [t, toggle],
  );

  const items: AccordionItem[] = useMemo(
    () => [
      {
        key: "continent",
        Icon: GlobeIcon,
        title: t("search.filterContinent"),
        subtitle: getSelectedOptionLabel(
          CONTINENT_OPTIONS,
          draft.continent,
          "search.filterContinentAll",
        ),
        content: renderOptions(CONTINENT_OPTIONS, draft.continent, "continent"),
      },
      {
        key: "population",
        Icon: PeopleOutline,
        title: t("search.filterPopulation"),
        subtitle: getSelectedOptionLabel(
          POPULATION_OPTIONS,
          draft.population,
          "search.filterPopulationAll",
        ),
        content: renderOptions(
          POPULATION_OPTIONS,
          draft.population,
          "population",
        ),
      },
      {
        key: "language",
        Icon: LanguageOutline,
        title: t("search.filterLanguage"),
        subtitle: getSelectedOptionLabel(
          LANGUAGE_OPTIONS,
          draft.language,
          "search.filterLanguageAll",
        ),
        content: renderOptions(LANGUAGE_OPTIONS, draft.language, "language"),
      },
    ],
    [draft, renderOptions, t],
  );

  const handleClear = useCallback(() => {
    const cleared: SearchFilters = {};
    setDraft(cleared);
    onApply(cleared);
  }, [onApply]);

  const handleApply = useCallback(() => {
    onApply(draft);
  }, [draft, onApply]);

  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Text variant="bodyLargeMedium">{t("search.filters")}</Text>
      </View>

      <Accordion items={items} hideSeparator />

      <View style={styles.footer}>
        <Button
          variant="outline"
          fullWidth
          label={t("search.filterClear")}
          onPress={handleClear}
          containerStyle={styles.clearButton}
        />
        <Button
          fullWidth
          label={t("search.filterApply")}
          onPress={handleApply}
          containerStyle={styles.footerButton}
        />
      </View>
    </View>
  );
};

export const SearchFilterCard = React.memo(SearchFilterCardComponent);
