import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";
import TabNavigator from "./src/navigation/TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  // const [token, setToken] = useState("");
  // const [userId, setUserId] = useState("");
  // const [isUserExist, setIsUserExist] = useState(false);

  // const getData = () => {
  //   try {
  //     AsyncStorage.getItem("body").then((value) => {
  //       if (value != null) {
  //         let body = JSON.parse(value);
  //         setToken(body.token);
  //         setUserId(body.user.id);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // fetch("http://91.227.2.183:443/user/isUserExist", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     token: token,
  //     userId: userId,
  //   }),
  // }).then((responce) => {
  //   if (responce.status === 200) {
  //     setIsUserExist(true);
  //   } else {
  //     setIsUserExist(false);
  //   }
  // });

  return (
    // <NavigationContainer>
    //   {isUserExist ? <AppNavigation /> : <TabNavigator />}
    // </NavigationContainer>
    <AppNavigation />
  );
}

export default App;
