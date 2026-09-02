import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import type { ParseKeys } from "i18next";

import {
  BinnocularsIcon,
  CalendarSearchIcon,
  CloudAndSunIcon,
  CurrencyIcon,
  RestaurantsIcon,
} from "@shared/assets/icons";

export type CountrySection = {
  id: string;
  titleKey: ParseKeys;
  subtitleKey: ParseKeys;
  Icon: ComponentType<SvgProps>;
  expandable?: boolean;
  external?: boolean;
};

export const COUNTRY_SECTIONS: CountrySection[] = [
  {
    id: "exploreItinerary",
    titleKey: "country.sections.exploreItinerary.title",
    subtitleKey: "country.sections.exploreItinerary.subtitle",
    Icon: CalendarSearchIcon,
  },
  {
    id: "destinations",
    titleKey: "country.sections.destinations.title",
    subtitleKey: "country.sections.destinations.subtitle",
    Icon: BinnocularsIcon,
  },
  {
    id: "bestTime",
    titleKey: "country.sections.bestTime.title",
    subtitleKey: "country.sections.bestTime.subtitle",
    Icon: CloudAndSunIcon,
  },
  {
    id: "food",
    titleKey: "country.sections.food.title",
    subtitleKey: "country.sections.food.subtitle",
    Icon: RestaurantsIcon,
    external: true,
  },
  {
    id: "exchange",
    titleKey: "country.sections.exchange.title",
    subtitleKey: "country.sections.exchange.subtitle",
    Icon: CurrencyIcon,
    expandable: true,
  },
];
