import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import type { ParseKeys } from "i18next";

import {
  CurrencyIcon,
  LeafIcon,
  LocationIcon,
  RestaurantsIcon,
} from "@shared/assets/icons";

export type CountrySection = {
  id: string;
  titleKey: ParseKeys;
  subtitleKey: ParseKeys;
  Icon: ComponentType<SvgProps>;
  expandable?: boolean;
};

export const COUNTRY_SECTIONS: CountrySection[] = [
  {
    id: "destinations",
    titleKey: "country.sections.destinations.title",
    subtitleKey: "country.sections.destinations.subtitle",
    Icon: LocationIcon,
  },
  {
    id: "bestTime",
    titleKey: "country.sections.bestTime.title",
    subtitleKey: "country.sections.bestTime.subtitle",
    Icon: LeafIcon,
  },
  {
    id: "food",
    titleKey: "country.sections.food.title",
    subtitleKey: "country.sections.food.subtitle",
    Icon: RestaurantsIcon,
  },
  {
    id: "exchange",
    titleKey: "country.sections.exchange.title",
    subtitleKey: "country.sections.exchange.subtitle",
    Icon: CurrencyIcon,
    expandable: true,
  },
];
