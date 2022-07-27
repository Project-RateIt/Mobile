import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchProductsScreen from "./screens/SearchProductsScreen";
import FollowedProductsScreen from "./screens/FollowedProductsScreen";
import RatedProductsScreen from "./screens/RatedProductsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RateScreen from "./screens/RateScreen";
import NoteScreen from "./screens/NoteScreen";

const { Navigator, Screen } = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name="Login" component={LoginScreen}></Screen>
        <Screen name="Register" component={RegisterScreen}></Screen>
        <Screen name="Reset" component={ResetPasswordScreen}></Screen>
        <Screen name="Home" component={HomeScreen}></Screen>
        <Screen name="SearchProducts" component={SearchProductsScreen}></Screen>
        <Screen
          name="FollowedProducts"
          component={FollowedProductsScreen}
        ></Screen>
        <Screen name="RatedProducts" component={RatedProductsScreen}></Screen>
        <Screen name="Settings" component={SettingsScreen}></Screen>
        <Screen name="Rate" component={RateScreen}></Screen>
        <Screen name="Note" component={NoteScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
