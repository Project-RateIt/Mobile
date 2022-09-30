import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductScreen = ({ route, navigation }) => {
  const rate = () => navigation.navigate("Rate", { item: route.params.item });
  const note = () => navigation.navigate("Note", { item: route.params.item });

  const [rating, setRating] = useState();
  let avgRate = Math.round(
    route.params.item.rateSum / route.params.item.rateCount
  );

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

  const addToViewedProducts = async () => {
    await fetch("http://91.227.2.183:443/products/viewProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        productId: route.params.item.id,
        userId,
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("udalo sie");
      } else {
        alert("wypierdala sie");
        console.log(response);
      }
    });
  };

  useEffect(() => {
    getData();
    addToViewedProducts();
    if (route.params.item.rateSum === 0 || route.params.item.rateCount === 0) {
      setRating("Brak ocen");
    } else {
      setRating("Ocena " + avgRate + "/10");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/header_detail.png")}
        style={{ flex: 1, alignItems: "center" }}
        resizeMode={"stretch"}
      >
        <View style={styles.image_container}>
          <Animatable.Image
            source={{ uri: route.params.item.image }}
            style={styles.image}
            animation="bounceIn"
            duration={1500}
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
        <Text numberOfLines={3} style={styles.textName}>
          {route.params.item.name.toUpperCase()}
        </Text>
        <Text numberOfLines={2} style={styles.textDetail}>
          {route.params.item.producer}
        </Text>

        <Text style={styles.textPrice}>{rating}</Text>
        <TouchableOpacity onPress={rate}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#009245", "#8cc631"]}
            style={styles.button}
          >
            <Text style={styles.textOrder}>OCEŃ</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={note}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#009245", "#8cc631"]}
            style={styles.button}
          >
            <Text style={styles.textOrder}>NOTATKA</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SubategoryRanking", {
              item: route.params.item.subcategory,
              itemId: route.params.item.id,
            })
          }
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#009245", "#8cc631"]}
            style={styles.button}
          >
            <Text style={styles.textOrder}>MIEJSCE W RANKINGU</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

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
  status: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 3,
    borderColor: "green",
  },
  textPrice: {
    color: "green",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
  },
  textName: {
    color: "#3e3c3e",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 5,
  },
  textDetail: {
    color: "gray",
    fontSize: 16,
    marginTop: 10,
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
});
