import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MyProducts from "./screens/MyProductsScreen";
import LastProducts from "./screens/LastProductsScreen";

const { Navigator, Screen } = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login" headerMode="none">
        <Screen name="Login" component={LoginScreen}></Screen>
        <Screen name="Register" component={RegisterScreen}></Screen>
        <Screen name="Home" component={HomeScreen}></Screen>
        <Screen name="Reset" component={ResetPasswordScreen}></Screen>
        <Screen name="Settings" component={SettingsScreen}></Screen>
        <Screen name="MyProducts" component={MyProducts}></Screen>
        <Screen name="LastProducts" component={LastProducts}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
