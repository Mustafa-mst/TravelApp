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
};

export type BackTarget = { target: "exchange"; params?: undefined };

export type ExchangeStackParamList = {
  ExchangeHome: undefined;
};
