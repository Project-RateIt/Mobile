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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

export default function AddProduct({ navigation, route }) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);

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

  const Add = async () => {
    if (productName.trim().length == 0) {
      alert("Podaj nazwę produktu");
      return;
    }
    setLoading(true);
    fetch("http://91.227.2.183:443/products/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        userId,
        productName,
        ean: route.params.ean,
      }),
    }).then((response) => {
      response.json();
      if (response.status === 200) {
        setLoading(false);
        alert("Dodano produkt");
        navigation.goBack();
      } else {
        setLoading(false);
        alert("Wystąpił błąd");
      }
    });
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
          <Text style={styles.textHeader}>Dodaj produkt</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <Text style={styles.textFooter}>Nazwa produktu</Text>
            <View style={styles.action}>
              <Feather name="plus-square" size={24} color="black" />
              <TextInput
                onChangeText={(value) => setProductName(value)}
                placeholder="Nazwa produktu"
                style={styles.textInput}
              />
            </View>
            <Text style={styles.textFooter}>Producent</Text>
            <View style={styles.action}>
              <Ionicons
                name="person"
                size={24}
                color="black"
                style={styles.icon}
              />
              <TextInput
                onChangeText={(value) => setProductName(value)}
                placeholder="Nazwa produktu"
                style={styles.textInput}
              />
            </View>
          </KeyboardAvoidingView>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.button}>
              <TouchableOpacity
                onPress={Add}
                style={[
                  styles.signIn,
                  { borderColor: "#4dc2f8", borderWidth: 1 },
                ]}
              >
                <Text style={[styles.textSign, { color: "#5db8fe" }]}>
                  Dodaj produkt
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
    marginVertical: 15,
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
