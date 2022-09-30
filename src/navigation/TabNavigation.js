import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchProductsScreen from "../screens/SearchProductsScreen";
import RatedProductsScreen from "../screens/RatedProductsScreen";
import BarcodeScreen from "../screens/BarcodeScanner";
import SettingsScreen from "../screens/SettingsScreen";
import RankingScreen from "../screens/RankingScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { sizes } from "../constants/sizes";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          opacity: 0.95,
        },
        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="camera" size={color == Colors.primary ? sizes.iconTabBarActive : sizes.iconTabBarInactive } color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="SearchProducts"
        component={SearchProductsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="search" size={color == Colors.primary ? sizes.iconTabBarActive : sizes.iconTabBarInactive } color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home-sharp" size={color == Colors.primary ? sizes.iconTabBarActive : sizes.iconTabBarInactive } color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="trophy" size={color == Colors.primary ? sizes.iconTabBarActive : sizes.iconTabBarInactive } color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="settings" size={color == Colors.primary ? sizes.iconTabBarActive : sizes.iconTabBarInactive } color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
