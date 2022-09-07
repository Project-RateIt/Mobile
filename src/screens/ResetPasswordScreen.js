import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const reset = async () => {
    if (email.trim().length == 0) {
      alert("Podaj email");
      return;
    }
    try {
      setLoading(true);
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
          alert("Link do zmiany hasła zostal wyslany");
          navigation.navigate("Login");
        } else {
          alert("Spróbuj ponownie");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back"
            color="white"
            size={35}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Zmień hasło</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <Text style={styles.textFooter}>E-mail</Text>
            <View style={styles.action}>
              <MaterialIcons
                name="email"
                size={20}
                color="black"
                style={styles.icon}
              />
              <TextInput
                onChangeText={(value) => setEmail(value)}
                autoCapitalize="none"
                keybordType="email-address"
                placeholder="E-mail"
                style={styles.textInput}
              />
            </View>
          </KeyboardAvoidingView>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.button}>
              <TouchableOpacity
                onPress={reset}
                style={[
                  styles.signIn,
                  { borderColor: "#4dc2f8", borderWidth: 1 },
                ]}
              >
                <Text style={[styles.textSign, { color: "#5db8fe" }]}>
                  Zmień hasło
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009245",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  textFooter: {
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginTop: 3,
  },
  back: {
    position: "absolute",
    left: 0,
    marginTop: 50,
    marginLeft: 15,
  },
});
