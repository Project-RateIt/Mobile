import React, { useState, useEffect } from "react";
import { Button, SafeAreaView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteScreen = ({ route, navigation }) => {
  const [note, setNote] = useState("");

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

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

  const submit = () => {
    fetch("http://91.227.2.183:443/products/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        userId,
        productId: route.params.id,
        note: note,
      }),
    }).then((responce) => {
      if (responce.status === 200) {
        alert("Dodano notatke");
        navigation.navigate("Home");
      } else {
        alert("Spróbuj ponownie");
      }
    });
  };

  return (
    <SafeAreaView>
      <Text>Własna notatka</Text>
      <TextInput onChangeText={setNote} value={note} multiline={true} />
      <Button title="Zapisz notatke" onPress={submit} />
    </SafeAreaView>
  );
};

export default NoteScreen;
