import type { NavigatorScreenParams } from "@react-navigation/native";

import type { TripDetailMode, TripTemplate } from "@/features/trip";

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
  /**
   * A template or a real trip, identified by id — the screen loads it and does
   * not care which source it came from. `preview` carries just enough of the
   * list row to render the hero immediately instead of after the RPC resolves.
   */
  TripDetail: {
    id: string;
    mode: TripDetailMode;
    preview?: {
      title: string;
      cover_photo: string | null;
    };
  };
  DayDetail: {
    id: string;
    mode: TripDetailMode;
    dayId: string;
  };
};

export type BackTarget =
  | { target: "exchange"; params?: undefined }
  | { target: "createItinerary"; params?: { itinerary: TripTemplate } };

export type ExchangeStackParamList = {
  ExchangeHome: undefined;
};

export type ItineraryStackParamList = {
  CreateItinerary: { itinerary?: TripTemplate };
};
