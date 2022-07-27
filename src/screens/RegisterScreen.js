import * as React from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
  Appbar,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = () => {
    setLoading(true);
    fetch("http://91.227.2.183:443/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
      }),
    }).then((responce) => {
      responce.json();
      if (responce.status === 200) {
        setLoading(false);
        alert("Rejestracja powiodła się");
        navigation.navigate("Login");
      } else {
        setLoading(false);
        alert("Błędne dane logowania");
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar>
          <Appbar.BackAction />
          <Appbar.Content title="Zarejestruj" />
        </Appbar>
        <TextInput label="Imie" value={name} onChangeText={setName} />
        <TextInput label="Nazwisko" value={surname} onChangeText={setSurname} />
        <TextInput
          label="Email"
          keybordType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Haslo"
          secureTextEntry={true}
          right={<TextInput.Icon name="eye-off-outline" />}
          value={password}
          onChangeText={setPassword}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button mode="contained" onPress={register}>
            Zarejestruj
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
