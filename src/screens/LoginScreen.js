import React from "react";
import { useState, useEffect } from "react";
import { Alert, SafeAreaView, View, StyleSheet } from "react-native";
import { Card, Button, TextInput, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const register = () => navigation.navigate("Register");
  const reset = () => navigation.navigate("Reset");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("UserData").then((value) => {
        if (value != "null") {
          navigation.navigate("Home");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    if (email.trim().length == 0 || password.trim().length == 0) {
      Alert("Podaj dane logowania");
      return;
    }

    try {
      const body = { email, password };

      setLoading(true);

      fetch("http://91.227.2.183:443/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(async (responce) => {
        if (responce.status === 200) {
          const result = await responce.json();
          await AsyncStorage.setItem("body", JSON.stringify(result));
          alert("Logowanie powiodło się");
          navigation.navigate("Home");
        } else {
          alert("Błędne dane logowania");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Card>
          <Card.Title title="RateIt"></Card.Title>
          <Card.Content>
            <TextInput
              label="Email"
              keybordType="email-address"
              onChangeText={(value) => setEmail(value)}
            />
            <TextInput
              label="Haslo"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
            <Button style={styles.buttons} uppercase={false} onPress={reset}>
              Zapomniałes hasła
            </Button>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button style={styles.buttons} mode="contained" onPress={login}>
                Zaloguj
              </Button>
            )}
            <Button style={styles.buttons} onPress={register}>
              Zarejestruj
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#03142E",
  },
  view: {
    width: "80%",
  },
  buttons: {
    margin: 2,
    marginHorizontal: 0,
  },
});
