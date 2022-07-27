import React, { useState, useEffect } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setToken(body.token);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const reset = () => {
    if (email === "") {
      alert("Podaj email");
    } else {
      fetch("http://91.227.2.183:443/user/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
        }),
      }).then((responce) => {
        responce.json();
        if (responce.status === 200) {
          setLoading(false);
          alert("Link do zmiany hasła zostal wyslany");
          navigation.navigate("Login");
        } else {
          setLoading(false);
          alert("Spróbuj ponownie");
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar>
          <Appbar.BackAction />
          <Appbar.Content title="Zmiana Hasła" />
        </Appbar>
        <TextInput
          label="Email"
          keybordType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Button mode="contained" onPress={reset}>
          Zapomniałem hasła
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
