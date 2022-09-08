import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteScreen = ({ route, navigation }) => {
  const [note, setNote] = useState("");

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setToken(body.token);
          setUserId(body.user.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = () => {
    fetch("http://91.227.2.183:443/products/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        userId,
        productId: route.params.item.id,
        note: note,
      }),
    }).then((responce) => {
      if (responce.status === 200) {
        alert("Dodano notatke");
        navigation.navigate("Home");
      } else {
        alert("Spróbuj ponownie");
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/header_detail.png")}
        style={{ flex: 1, alignItems: "center" }}
        resizeMode={"stretch"}
      >
        <View style={styles.image_container}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={{ uri: route.params.item.image }}
            style={styles.image}
          />
        </View>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back"
            color="white"
            size={35}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
      <ScrollView style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome
            name="sticky-note"
            size={20}
            color="black"
            style={styles.icon}
          />
          <TextInput
            onChangeText={(value) => setNote(value)}
            multiline={true}
            placeholder="Oceń"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={submit}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#009245", "#8cc631"]}
            style={styles.button}
          >
            <Text style={styles.textOrder}>DODAJ NOTATKĘ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NoteScreen;

const height = Dimensions.get("screen").height;
const height_image = height * 0.5 * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  image_container: {
    width: height_image,
    height: height_image,
    marginTop: height_image / 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: height_image / 2,
  },
  back: {
    position: "absolute",
    left: 0,
    marginTop: 30,
    marginLeft: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 100,
  },
  textOrder: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    marginTop: 3,
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
});
