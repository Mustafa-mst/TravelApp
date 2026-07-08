import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Login: undefined;
};

export type BackTarget = { target: "exchange"; params?: undefined };

export type ExchangeStackParamList = {
  ExchangeHome: undefined;
};
