import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import type { AccordionItem } from "@shared/components";
import {
  GlobeIcon,
  LanguageOutline,
  PeopleOutline,
} from "@shared/assets/icons";
import type { OptionsType } from "@shared/types";
import { getOptionList, getSelectedOptionLabel } from "@shared/utils/option";
import { FilterOption } from "../components/SearchFilterSheet/FilterOption";
import {
  CONTINENT_OPTIONS,
  LANGUAGE_OPTIONS,
  POPULATION_OPTIONS,
} from "../constants";
import type { SearchFilters } from "../types";

const NO_FILTERS: SearchFilters = {};

type UseSearchFilterDraftParams = {
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
};

/** Holds the pending selection so the list only refetches once Apply is pressed. */
export function useSearchFilterDraft({
  filters,
  onApply,
}: UseSearchFilterDraftParams) {
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
        {getOptionList(options).map((option, index) => (
          <FilterOption
            key={option.value}
            option={option}
            filterKey={key}
            isSelected={option.value === selected}
            isFirst={index === 0}
            onToggle={toggle}
          />
        ))}
      </View>
    ),
    [toggle],
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
    setDraft(NO_FILTERS);
    onApply(NO_FILTERS);
  }, [onApply]);

  const handleApply = useCallback(() => {
    onApply(draft);
  }, [draft, onApply]);

  return { items, onClear: handleClear, onApply: handleApply };
}
