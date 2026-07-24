import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Itineraries: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Login: undefined;
  CountryDetail: {
    countryCode: string;
  };
  ItineraryDetail: {
    itinerary: Itinerary;
  };
  DayDetail: {
    itineraryId: string;
    dayId: string;
  };
};

import type { Itinerary } from "@/features/itinerary";

export type BackTarget =
  | { target: "exchange"; params?: undefined }
  | { target: "createItinerary"; params?: { itinerary: Itinerary } };

export type ExchangeStackParamList = {
  ExchangeHome: undefined;
};

export type ItineraryStackParamList = {
  CreateItinerary: { itinerary?: Itinerary };
};
