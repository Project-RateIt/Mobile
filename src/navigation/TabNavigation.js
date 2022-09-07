import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchProductsScreen from "../screens/SearchProductsScreen";
import RatedProductsScreen from "../screens/RatedProductsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RateScreen from "../screens/RateScreen";
import NoteScreen from "../screens/NoteScreen";
import BarcodeScreen from "../screens/BarcodeScanner";
import ProductScreen from "../screens/ProductScreen";
import OrderProductsScreen from "../screens/OrderProductsScreen";
import RankingScreen from "../screens/RankingScreen";
import CategoryRankingScreen from "../screens/CategoryRankingScreen";
import SubategoryRankingScreen from "../screens/SubcategoryRankingScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="SearchProducts"
        component={SearchProductsScreen}
      ></Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="RatedProducts"
        component={RatedProductsScreen}
      ></Tab.Screen>
      <Tab.Screen name="Ranking" component={RankingScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
