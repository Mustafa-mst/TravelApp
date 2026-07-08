import { CarType, StartOfWeek } from "@shared/constants/countries";

export type CountryNameDetail = {
  common: string;
  official: string;
};

export type CountryNameType = {
  [key: string]: CountryNameDetail;
  it: CountryNameDetail;
  es: CountryNameDetail;
  tr: CountryNameDetail;
  ru: CountryNameDetail;
  en: CountryNameDetail;
};

export type CountryDescriptionType = {
  description: {
    en: string;
    tr: string;
  };
};
export type CountryCurrenciesType = {
  code: string;
  name: string;
  symbol: string;
};
export type CountryPopulationType = {
  population: number;
  year: string;
};
export type CountryMapsType = {
  googleMaps: string;
  openStreetMaps: string;
};
export type CountryCarType = {
  signs: string[];
  side: CarType;
};
export type CountryImageType = {
  png: string;
  svg: string;
};
export type CountryPlugDataType = {
  plugTypes: string[];
  voltage: string;
  frequency: string;
};
export type CountryType = {
  id: string;
  name: CountryNameType;
  description: CountryDescriptionType;
  cca2: string;
  currencies?: CountryCurrenciesType[];
  idd: string;
  capital: string[];
  capital_info: {
    latlng: [number, number];
  };
  region?: string;
  subregion?: string;
  languages?: string[];
  latlng: [number, number];
  capitalInfo: { latlng: [number, number] };
  borders: string[];
  area: number;
  maps?: CountryMapsType;
  population_data?: CountryPopulationType;
  car?: CountryCarType;
  timezones?: string[];
  continents?: string[];
  flags: CountryImageType;
  start_of_week?: StartOfWeek; // sadece geçerli günler
  plug_data?: CountryPlugDataType;
};