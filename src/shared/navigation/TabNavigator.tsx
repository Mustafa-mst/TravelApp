import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { AccountScreen } from "@/features/auth";
import { SearchScreen } from "@/features/search";
import { HomeScreen } from "@/features/home";
import { ItinerariesScreen } from "@/features/itinerary";
import {
  CalendarMonthIcon,
  HomeIcon,
  ProfileIcon,
  SearchIcon,
} from "@shared/assets/icons";
import { BottomTabBar } from "./BottomTabBar";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

const iconMode = (focused: boolean, color: string) =>
  focused
    ? { fill: color, stroke: color }
    : { fill: "none" as const, stroke: color };

export function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon width={size} height={size} {...iconMode(focused, color)} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: t("tabs.search"),
          tabBarIcon: ({ focused, color, size }) => (
            <SearchIcon
              width={size}
              height={size}
              fill="none"
              stroke={color}
              strokeWidth={focused ? 2.2 : 1.6}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Itineraries"
        component={ItinerariesScreen}
        options={{
          title: t("tabs.itineraries"),
          tabBarIcon: ({ focused, color, size }) => (
            <CalendarMonthIcon
              width={size}
              height={size}
              {...iconMode(focused, color)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: t("tabs.account"),
          tabBarIcon: ({ focused, color, size }) => (
            <ProfileIcon
              width={size}
              height={size}
              {...iconMode(focused, color)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
