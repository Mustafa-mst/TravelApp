import type { CountryImageType, CountryNameType } from "@shared/types";
import type {
  Continent,
  PopulationFilter,
  SearchLanguage,
} from "../constants";

/** Mirrors the optional arguments of the `get_countries` RPC. */
export type SearchFilters = {
  continent?: Continent | null;
  population?: PopulationFilter | null;
  language?: SearchLanguage | null;
};

/** A country row as returned by `get_countries`, and as stored in history. */
export type CountrySearchResult = {
  id: string;
  cca2: string;
  name: CountryNameType;
  flags: CountryImageType | null;
  region: string | null;
  subregion: string | null;
};
