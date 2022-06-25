import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const reset = () => navigation.navigate("Login");

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar>
          <Appbar.BackAction />
          <Appbar.Content title="Nowe hasło" />
        </Appbar>
        <TextInput label="Email" keybordType="email-address" />
        <TextInput
          label="Haslo"
          secureTextEntry={true}
          right={<TextInput.Icon name="eye-off-outline" />}
        />
        <TextInput
          label="Powtórz hasło"
          secureTextEntry={true}
          right={<TextInput.Icon name="eye-off-outline" />}
        />
        <Button mode="contained" onPress={reset}>
          Zarejestruj
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
