import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
// icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

const Settings = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [jwt, setJwt] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setJwt(body.jwt);
          setUserId(body.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAvatar();
  }, []);

  const getAvatar = async () => {
    try {
      await fetch("http://192.168.1.11:5002/avatars_rateit/" + userId)
        .then((response) => response.text())
        .then((response) => {
          setUserAvatar(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const changeEmail = async () => {
    if (email !== "") {
      try {
        await fetch("http://91.227.2.183:83/api/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
          body: JSON.stringify({
            email,
          }),
        }).then((response) => {
          if (response.status === 200) {
            alert("Pomyślnie zmieniono email");
          } else {
            console.warn(response);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeName = async () => {
    if (name !== "") {
      try {
        await fetch("http://91.227.2.183:83/api/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
          body: JSON.stringify({
            name,
          }),
        }).then((response) => {
          if (response.status === 200) {
            alert("Pomyślnie zmieniono email");
          } else {
            console.warn(response);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality: 0.02,
    });

    let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null;
    imageUri && console.log({ uri: imageUri.slice(0, 100) });
    console.log(result.base64);

    if (!result.cancelled) {
      try {
        fetch(
          `http://91.227.2.183:83/api/user/changePhoto?base64=${result.base64}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + jwt,
            },
          }
        ).then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Pomyślnie zmieniono avatar");
          } else {
            console.warn(response);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("body");
      AsyncStorage.getItem("body").then((value) => {
        console.log(value);
      });
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.container}
      >
        <View style={{ width: "100%", marginTop: 15, paddingHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Ustawienia</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionLegend}>
                <Text style={styles.sectionLegendText}>Użytkownik</Text>
              </View>
              <View style={styles.sectionContent}>
                <TouchableOpacity
                  onPress={changeImage}
                  style={styles.sectionContainer}
                >
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: `data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=`,
                    }}
                  />
                  <Text style={styles.sectionTitle}>Zmień avatar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.search_input}>
                  <TextInput
                    onChangeText={setName}
                    value={name}
                    placeholder="Nowa nazwa użytkownika"
                    style={styles.search_input_content}
                  />
                </View>
                <TouchableOpacity
                  style={styles.sectionContainer}
                  onPress={changeName}
                >
                  <Text style={styles.sectionTitle}>
                    Zmień nazwę użytkownika
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sectionContent}>
                <View style={styles.search_input}>
                  <TextInput
                    placeholder="Nowy email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    style={styles.search_input_content}
                  />
                </View>
                <TouchableOpacity
                  style={styles.sectionContainer}
                  onPress={changeEmail}
                >
                  <Text style={styles.sectionTitle}>Zmień email</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionLegend}>
              <Text style={styles.sectionLegendText}>Social Media</Text>
            </View>
            <TouchableOpacity style={styles.sectionContainer}>
              <FontAwesome
                name="facebook-square"
                size={24}
                color={Colors.lessLightGreen}
              />
              <Text style={styles.sectionTitle}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sectionContainer}>
              <AntDesign
                name="instagram"
                size={24}
                color={Colors.lessLightGreen}
              />
              <Text style={styles.sectionTitle}>Instagram</Text>
            </TouchableOpacity>

            <View style={styles.sectionLegend}>
              <Text style={styles.sectionLegendText}>Polityka i Regulamin</Text>
            </View>
            <TouchableOpacity style={styles.sectionContainer}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={Colors.lessLightGreen}
              />
              <Text style={styles.sectionTitle}>Regulamin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sectionContainer}>
              <MaterialIcons
                name="security"
                size={24}
                color={Colors.lessLightGreen}
              />
              <Text style={styles.sectionTitle}>Polityka prywatności</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logOut} onPress={logOut}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Wyloguj się
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfo: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  section: {
    marginTop: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 300,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.lessLightGreen,
  },
  sectionContainer: {
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.lightGreen,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  socialMediaImage: {
    width: 25,
    height: 25,
    marginRight: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
  },
  header: {
    flexDirection: "row",
  },
  logOut: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    color: "white",
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 20,
  },
  sectionLegendText: {
    color: Colors.lessLightGreen,
  },
  search_input: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.lightGray,

    padding: 10,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: "center",
  },
  search_input_content: {
    flex: 1,
    textAlign: "center",
  },
});
