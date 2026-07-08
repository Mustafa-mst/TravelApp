import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountScreen } from "@/features/auth";
import { SearchScreen } from "@/features/search";
import { HomeScreen } from "@/features/home";
import { colors } from "@shared/styles";
import { HomeIcon, ProfileIcon, SearchIcon } from "@shared/assets/icons";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={40} height={40} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Ara",
          tabBarIcon: ({ color }) => (
            <SearchIcon width={20} height={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Hesap",
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={40} height={40} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
