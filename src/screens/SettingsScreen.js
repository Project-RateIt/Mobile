import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

const Settings = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setToken(body.token);
          setUserId(body.user.id);
          setAvatar(body.user.haveAvatar);
          setName(body.user.name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    avatar !== "" && name !== "" && userId !== "" && getAvatar();
  }, [avatar, name, userId]);

  const getAvatar = () => {
    fetch("http://91.227.2.183:5002/avatars_rateit/" + userId)
      .then((responce) => responce.text())
      .then((responce) => {
        setUserAvatar(responce);
      });
  };

  const resetEmail = () => {
    fetch("http://91.227.2.183:443/user/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "token",
        userId: 40891190,
        mode: 2,
        value: newEmail,
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("Pomyślnie zmieniono avatar");
      } else {
        console.log("-------------------------err-------------");
        console.log(token);
        console.log(userId);
      }
    });
  };

  const changeName = () => {
    fetch("http://91.227.2.183:443/user/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        id: userId,
        mode: 0,
        value: newName,
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("Pomyślnie zmieniono nazwe");
      } else {
        console.log("-------------------------err-------------");
        console.log(token);
        console.log(userId);
      }
    });
  };

  const changeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      width: 200,
      height: 200,
      aspect: [4, 3],
      quality: 0.5,
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
          token: token,
          id: userId,
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.container}
      >
        <View style={{ width: "90%", marginTop: 15, alignItems: "center" }}>
          <Text style={styles.title}>Ustawienia</Text>

          <TouchableOpacity
            onPress={changeImage}
            style={styles.sectionContainer}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: `data:image/jpeg;base64,${userAvatar}`,
              }}
            />
            <Text style={styles.sectionTitle}>Zmień avatar</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={changeName}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>Zmień nazwę</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.sectionContainer}>
            <Image
              style={styles.socialMediaImage}
              source={require("../../assets/facebook.png")}
            />
            <Text style={styles.sectionTitle}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionContainer}>
            <Image
              style={styles.socialMediaImage}
              source={require("../../assets/instagram.png")}
            />
            <Text style={styles.sectionTitle}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Regulamin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Polityka prywatności</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 300,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
  },
  sectionContainer: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    justifyContent: "space-between",
  },
  socialMediaImage: {
    width: 25,
    height: 25,
    marginRight: 8,
    borderRadius: 8,
  },
});
