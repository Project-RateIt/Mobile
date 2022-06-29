import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";

const RateScreen = ({ navigation, route }) => {
  const [rate, setRate] = useState("");

  const rated = () => {
    if (rate < 11) {
      fetch("http://91.227.2.183:443/products/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "6P1OJEMWRU_39781998_28-06-2022 22:03:14",
          userId: 39781998,
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
        <Button mode="contained" onPress={rated}>
          Oceń
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RateScreen;
