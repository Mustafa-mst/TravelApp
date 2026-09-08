import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { AccountScreen } from "@/features/auth";
import { HomeScreen } from "@/features/home";
import { SearchScreen } from "@/features/search";
import { TemplatesScreen } from "@/features/trip";
import {
  CalendarIcon,
  HomeIcon,
  ProfileIcon,
  SearchFilledIcon,
} from "@shared/assets/icons";
import { useThemeColors } from "@shared/hooks";
import { BottomTabBar } from "./BottomTabBar";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: t("tabs.search"),
          tabBarIcon: ({ color, size }) => (
            <SearchFilledIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Templates"
        component={TemplatesScreen}
        options={{
          title: t("tabs.templates"),
          tabBarIcon: ({ color, size }) => (
            <CalendarIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: t("tabs.account"),
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={size} height={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
