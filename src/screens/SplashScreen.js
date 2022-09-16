import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    startApp();
  }, []);

  const startApp = async () => {
    const isBackendOnline = await testApi();
    if (!isBackendOnline) {
      Alert.alert(
        "Błąd połączenia",
        "Upewnij się ze masz połączenie z internetem, lub spróbuj ponownie później.",
        [
          {
            text: "Spróbuj ponownie",
            onPress: () => {
              startApp();
            },
          },
        ]
      );
      return;
    }
    await getUserExist();
  };

  const testApi = async () => {
    return await fetch("http://91.227.2.183:443/example/test").then(
      (response) => {
        return response.status === 404;
      }
    );
  };

  const getUserExist = async () => {
    try {
      const user = await AsyncStorage.getItem("body");
      if (user === null) return;
      let body = JSON.parse(user);
      reqBody = { token: body.token, id: body.user.id };

      await fetch("http://91.227.2.183:443/user/isUserExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          navigation.navigate("Home");
          return;
        } else {
          navigation.navigate("Login");
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require("../../assets/prof.jpg")}
          style={styles.logo}
          resizeMode={"stretch"}
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>JAKIŚ TEKST ZACHĘCAJĄCY</Text>
        <Text style={styles.text}>
          {/* {isBackendOnline ? "Kontynuuj" : "Zaloguj się"} */}
          TEKST
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={"login"}>
            <LinearGradient
              colors={["#009245", "#8cc631"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Zacznij oceniać</Text>
              <MaterialIcons name="navigate-next" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009245",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
  },
  title: {
    color: "#009245",
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
