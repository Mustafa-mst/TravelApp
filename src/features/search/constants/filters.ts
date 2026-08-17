import type { OptionsType } from "@shared/types";

/** Values match the bucket names `get_countries.population_filter` accepts. */
export enum PopulationFilter {
  Under1M = "under_1m",
  From1MTo10M = "1m_10m",
  From10MTo50M = "10m_50m",
  From50MTo100M = "50m_100m",
  Over100M = "over_100m",
}

/** Values match the `languages` column that `get_countries` filters on. */
export enum SearchLanguage {
  English = "English",
  French = "French",
  Arabic = "Arabic",
  Spanish = "Spanish",
  Portuguese = "Portuguese",
  Russian = "Russian",
}

export const POPULATION_OPTIONS: OptionsType<PopulationFilter> = {
  [PopulationFilter.Under1M]: { labelKey: "search.population.under1m" },
  [PopulationFilter.From1MTo10M]: { labelKey: "search.population.1mTo10m" },
  [PopulationFilter.From10MTo50M]: { labelKey: "search.population.10mTo50m" },
  [PopulationFilter.From50MTo100M]: { labelKey: "search.population.50mTo100m" },
  [PopulationFilter.Over100M]: { labelKey: "search.population.over100m" },
};

/**
 * The six most widely spoken languages in the dataset. Ordered by how many
 * countries list them, so the longest result sets sit at the top.
 */
export const LANGUAGE_OPTIONS: OptionsType<SearchLanguage> = {
  [SearchLanguage.English]: { labelKey: "search.languages.english" },
  [SearchLanguage.French]: { labelKey: "search.languages.french" },
  [SearchLanguage.Arabic]: { labelKey: "search.languages.arabic" },
  [SearchLanguage.Spanish]: { labelKey: "search.languages.spanish" },
  [SearchLanguage.Portuguese]: { labelKey: "search.languages.portuguese" },
  [SearchLanguage.Russian]: { labelKey: "search.languages.russian" },
};
