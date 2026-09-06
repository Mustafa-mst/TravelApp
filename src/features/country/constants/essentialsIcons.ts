import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import {
  ActivityIcon,
  BanknoteIcon,
  CalendarIcon,
  CarIcon,
  CoinIcon,
  DirectionRightIcon,
  DollarSignIcon,
  GlobeIcon,
  LanguageOutline,
  LocationIcon,
  MapIcon,
  PeopleOutline,
  PhoneIcon,
  PlugIcon,
  ZapIcon,
} from "@shared/assets/icons";

/** Row key to the icon that fronts it; keys come from useCountryEssentials. */
export const ESSENTIAL_ROW_ICONS: Record<string, ComponentType<SvgProps>> = {
  currency: CoinIcon,
  currencyName: BanknoteIcon,
  currencySymbol: DollarSignIcon,
  plugTypes: PlugIcon,
  voltage: ZapIcon,
  frequency: ActivityIcon,
  startOfWeek: CalendarIcon,
  carSide: CarIcon,
  carSigns: DirectionRightIcon,
  diallingCode: PhoneIcon,
  languages: LanguageOutline,
  capital: LocationIcon,
  region: GlobeIcon,
  area: MapIcon,
  population: PeopleOutline,
  timezones: CalendarIcon,
};
