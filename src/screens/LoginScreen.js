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

  const login = async () => {
    navigation.navigate("Home");
    setLoading(true);
    // fetch("localhost:5000/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Email: email,
    //     Password: password,
    //   }),
    // }).then((responce) => {
    //   responce.json();
    //   if (responce.status === 200) {
    //     setLoading(false);
    //     navigation.navigate("Home");
    //   } else {
    //     setLoading(false);
    //     Alert.alert("Błędne dane logowania", {
    //       text: "OK",
    //       onPress: () => console.log("OK Pressed"),
    //     });
    //   }
    // });

    const req = await fetch("192.168.0.108:5000/swagger/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    const res = await req.json();
    console.log(res);

    if (res.status === 200) {
      setLoading(false);
      navigation.navigate("Home");
    } else {
      setLoading(false);
      Alert.alert("Błędne dane logowania", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    }
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
