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
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const register = async () => {
    if (
      email.trim().length == 0 ||
      password.trim().length == 0 ||
      name.trim().length == 0 ||
      surname.trim().length == 0
    ) {
      alert("Podaj dane rejestracji");
      return;
    }
    try {
      setLoading(true);
      fetch(
        `http://91.227.2.183:83/api/user/register?name=${name.trim()}&surname=${surname.trim()}&email=${email.trim()}&password=${password.trim()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((response) => {
        response.json();
        if (response.status === 200) {
          alert("Rejestracja powiodła się");
          navigation.navigate("ActiveUserScreen", { email: email });
        } else {
          alert("Wystąpił bląd spróbuj ponownie");
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
          <Text style={styles.textHeader}>Zarejestruj się</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.textFooter}>Imię</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="user"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  onChangeText={(value) => setName(value)}
                  placeholder="Imię"
                  style={styles.textInput}
                />
              </View>

              <Text style={[styles.textFooter, { marginTop: 25 }]}>
                Nazwisko
              </Text>
              <View style={styles.action}>
                <FontAwesome
                  name="user"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  onChangeText={(value) => setSurname(value)}
                  placeholder="Nazwisko"
                  style={styles.textInput}
                />
              </View>

              <Text style={[styles.textFooter, { marginTop: 25 }]}>E-mail</Text>
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

              <Text style={[styles.textFooter, { marginTop: 25 }]}>Hasło</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="lock"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  autoCapitalize="none"
                  placeholder="Hasło"
                  style={styles.textInput}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={passwordVisible}
                />
                <Ionicons
                  style={styles.icon}
                  name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  size={20}
                  color="black"
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.button}>
              <TouchableOpacity
                onPress={register}
                style={[
                  styles.signIn,
                  { borderColor: "#4dc2f8", borderWidth: 1 },
                ]}
              >
                <Text style={[styles.textSign, { color: "#5db8fe" }]}>
                  Zarejestruj
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
