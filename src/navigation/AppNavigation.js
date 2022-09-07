import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
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
import SplashScreen from "../screens/SplashScreen";

const { Navigator, Screen } = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Splash" component={SplashScreen}></Screen>
        <Screen name="Login" component={LoginScreen}></Screen>
        <Screen name="Register" component={RegisterScreen}></Screen>
        <Screen name="Reset" component={ResetPasswordScreen}></Screen>
        <Screen name="Home" component={HomeScreen}></Screen>
        <Screen name="SearchProducts" component={SearchProductsScreen}></Screen>
        <Screen name="RatedProducts" component={RatedProductsScreen}></Screen>
        <Screen name="Settings" component={SettingsScreen}></Screen>
        <Screen name="Rate" component={RateScreen}></Screen>
        <Screen name="Note" component={NoteScreen}></Screen>
        <Screen name="Barcode" component={BarcodeScreen}></Screen>
        <Screen name="ProductDetails" component={ProductScreen}></Screen>
        <Screen name="Admin" component={OrderProductsScreen}></Screen>
        <Screen name="Ranking" component={RankingScreen}></Screen>
        <Screen
          name="CategoryRanking"
          component={CategoryRankingScreen}
        ></Screen>
        <Screen
          name="SubategoryRanking"
          component={SubategoryRankingScreen}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
