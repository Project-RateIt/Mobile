import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const SplashScreen = ({ navigation }) => {
  const login = () => navigation.navigate("Login");

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
        <Text style={styles.text}>Zaloguj się</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={login}>
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
