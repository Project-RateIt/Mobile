import React from "react";
import { useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const register = () => navigation.navigate("Register");
  const reset = () => navigation.navigate("Reset");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    navigation.navigate("Home");
    setLoading(true);
    fetch("http://91.227.2.183:443/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    }).then((responce) => {
      responce.json();
      if (responce.status === 200) {
        setLoading(false);
        alert("Logowanie powiodło się");
      } else {
        setLoading(false);
        alert("Błędne dane logowania");
      }
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Card>
          <Card.Title title="RateIt"></Card.Title>
          <Card.Content>
            <TextInput
              label="Email"
              keybordType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              label="Haslo"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Button uppercase={false} onPress={reset}>
              Zapomniałes hasła
            </Button>
            <Button mode="contained" onPress={login}>
              Zaloguj
            </Button>
            <Button onPress={register}>Zarejestruj</Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}
