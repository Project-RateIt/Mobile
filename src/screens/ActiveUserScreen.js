import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const ActiveUserScreen = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    if (code.trim().length < 4) {
      alert("Podano zły kod");
      return;
    }
    try {
      setLoading(true);
      fetch(
        `http://91.227.2.183:83/api/user/activate?email=${route.params.email}&code=${code}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(async (response) => {
        if (response.status === 200) {
          navigation.navigate("Login");
        } else {
          console.log(response);
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
          <Text style={styles.textHeader}>Potwierdz rejestracje</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <Text style={styles.textFooter}>Podaj kod z maila</Text>
            <View style={styles.action}>
              <Octicons
                name="mail"
                size={20}
                color="black"
                style={styles.icon}
              />

              <TextInput
                onChangeText={(value) => setCode(value)}
                keybordType="number"
                style={styles.textInput}
                autoCapitalize={characters}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity onPress={""}>
            <Text style={{ color: "#162c4a", marginTop: 15 }}>
              Wyslij ponownie
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity onPress={confirm} style={styles.signIn}>
              <LinearGradient
                colors={["#5db8fe", "#39cff2"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "white" }]}>
                  Wyslij kod
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ActiveUserScreen;

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
