import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Button } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RateScreen = ({ navigation, route }) => {
  const [rate, setRate] = useState("");

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

  const rated = () => {
    if (rate < 11) {
      fetch("http://91.227.2.183:443/products/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userId,
          productId: route.params.id,
          rate: rate,
        }),
      }).then((responce) => {
        if (responce.status === 200) {
          alert("Oceniono pomyślnie");
          navigation.navigate("Home");
        } else {
          alert("Spróbuj ponownie");
        }
      });
    } else {
      alert("Oceń od 1 do 10");
    }
  };

  const unrate = () => {
    fetch("http://91.227.2.183:443/products/unrate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        userId,
        productId: route.params.id,
      }),
    }).then((responce) => {
      if (responce.status === 200) {
        alert("Usunięto ocenę pomyślnie");
        navigation.navigate("Home");
      } else {
        alert("Spróbuj ponownie");
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar>
          <Appbar.BackAction />
          <Appbar.Content title="Oceń" />
        </Appbar>
        <TextInput
          label="Ocena"
          keyboardType="phone-pad"
          value={rate}
          onChangeText={setRate}
        />
        <Button title="Oceń" onPress={rated} />

        <Button title="Usuń ocenę" onPress={unrate} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RateScreen;
