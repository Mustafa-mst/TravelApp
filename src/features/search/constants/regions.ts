import {
  GlobeAfricaIcon,
  GlobeAsiaIcon,
  GlobeEuropeIcon,
  GlobeNorthAmericaIcon,
  GlobeOceaniaIcon,
  GlobeSouthAmericaIcon,
} from "@shared/assets/icons";
import type { OptionsType } from "@shared/types";

/** Values match the `continents` column that `get_countries` filters on. */
export enum Continent {
  Africa = "Africa",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

/**
 * Each key doubles as the argument sent to `get_countries.continent_filter`,
 * which matches against `continents` rather than `region`/`subregion` — so the
 * two Americas need no subregion narrowing.
 */
export const CONTINENT_OPTIONS: OptionsType<Continent> = {
  [Continent.Europe]: {
    labelKey: "search.continents.europe",
    Icon: GlobeEuropeIcon,
  },
  [Continent.Asia]: {
    labelKey: "search.continents.asia",
    Icon: GlobeAsiaIcon,
  },
  [Continent.Africa]: {
    labelKey: "search.continents.africa",
    Icon: GlobeAfricaIcon,
  },
  [Continent.NorthAmerica]: {
    labelKey: "search.continents.northAmerica",
    Icon: GlobeNorthAmericaIcon,
  },
  [Continent.SouthAmerica]: {
    labelKey: "search.continents.southAmerica",
    Icon: GlobeSouthAmericaIcon,
  },
  [Continent.Oceania]: {
    labelKey: "search.continents.oceania",
    Icon: GlobeOceaniaIcon,
  },
};
