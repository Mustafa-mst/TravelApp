import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { AccountScreen } from "@/features/auth";
import { DashboardScreen } from "@/features/dashboard";
import { HomeScreen } from "@/features/home";
import { TemplatesScreen } from "@/features/trip";
import {
  CalendarIcon,
  DashboardIcon,
  HomeIcon,
  ProfileIcon,
} from "@shared/assets/icons";
import { BottomTabBar } from "./BottomTabBar";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

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
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: t("tabs.dashboard"),
          tabBarIcon: ({ color, size }) => (
            <DashboardIcon width={size} height={size} color={color} />
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
