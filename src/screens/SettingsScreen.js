import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const [newEmail, setNewEmail] = useState("");

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

  // const resetEmail = () => {
  //   fetch("http://91.227.2.183:443/user/settings", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: "token",
  //       userId: 40891190,
  //       mode: 2,
  //       value: newEmail,
  //     }),
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       alert("Pomyślnie zmieniono avatar");
  //     } else {
  //       console.log("-------------------------err-------------");
  //       console.log(token);
  //       console.log(userId);
  //     }
  //   });
  // };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      width: 200,
      height: 200,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null;
    imageUri && console.log({ uri: imageUri.slice(0, 100) });

    if (!result.cancelled) {
      fetch("http://91.227.2.183:443/user/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "token",
          userId: 40891190,
          mode: 3,
          value: result.base64.toString(),
        }),
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Pomyślnie zmieniono avatar");
        } else {
          response.status;
          console.log("-------------------------err-------------");
          console.log(result.base64);
        }
      });
    }
  };

  return (
    <View>
      <Text>Settings</Text>
      {/* <TextInput
        label="Email"
        keybordType="email-address"
        onChangeText={(value) => setNewEmail(value)}
      />
      <Button title="zmień email" onPress={resetEmail} /> */}
      {/* <Button title="zmień avatar" onPress={pickImage} /> */}
    </View>
  );
};

export default Settings;
