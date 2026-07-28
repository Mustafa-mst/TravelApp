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
    itinerary: TripTemplate;
  };
  DayDetail: {
    itineraryId: string;
    dayId: string;
  };
};

import type { TripTemplate } from "@/features/trip";

export type BackTarget =
  | { target: "exchange"; params?: undefined }
  | { target: "createItinerary"; params?: { itinerary: TripTemplate } };

export type ExchangeStackParamList = {
  ExchangeHome: undefined;
};

export type ItineraryStackParamList = {
  CreateItinerary: { itinerary?: TripTemplate };
};
