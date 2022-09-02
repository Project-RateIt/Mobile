import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Button, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, TextInput, ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const register = () => navigation.navigate("Register");
  const reset = () => navigation.navigate("Reset");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Zaloguj",
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("UserData").then((value) => {
        console.log(value);
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
        <TextInput
          autoCapitalize="none"
          activeUnderlineColor="#b0b4be"
          underlineColor="transparent"
          style={{ marginBottom: 10 }}
          label="Email"
          keybordType="email-address"
          onChangeText={(value) => setEmail(value)}
          left={<TextInput.Icon name="email" color="#62687a" />}
        />
        <TextInput
          autoCapitalize="none"
          activeUnderlineColor="#b0b4be"
          underlineColor="transparent"
          style={{ marginBottom: 5 }}
          label="Haslo"
          secureTextEntry={passwordVisible}
          left={<TextInput.Icon name="lock" color="#62687a" />}
          right={
            <TextInput.Icon
              name={passwordVisible ? "eye" : "eye-off"}
              color="#b0b4be"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          onChangeText={(value) => setPassword(value)}
        />
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
          onPress={reset}
        >
          <Text style={{ color: "#162c4a" }}>Zapomniałeś hasła</Text>
        </Pressable>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <LinearGradient
            start={{ x: 0.7, y: 0 }}
            onPress={login}
            colors={["#ffc400", "#ff8800"]}
            style={styles.login}
          >
            <Text style={styles.text}>Zaloguj</Text>
          </LinearGradient>
        )}
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.facebook}
        >
          <Text style={styles.text}>Zaloguj z Facebook</Text>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.7, y: 0 }}
          onPress={register}
          colors={["#ffff84", "#ffe501", "#fecd01", "#ffac00"]}
          style={styles.login}
        >
          <Text style={styles.text}>Zarejestruj</Text>
        </LinearGradient>
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
    backgroundColor: "#ffffff",
  },
  view: {
    width: "90%",
  },
  login: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  facebook: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 16,
    color: "#fff",
  },
});
