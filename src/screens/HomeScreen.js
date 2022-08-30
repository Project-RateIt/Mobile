import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Paragraph, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const searchProducts = () => navigation.navigate("SearchProducts");
  const ratedProducts = () => navigation.navigate("RatedProducts");
  const settings = () => navigation.navigate("Settings");
  const barcode = () => navigation.navigate("Barcode");
  const ranking = () => navigation.navigate("Ranking");
  const admin = () => navigation.navigate("Admin");

  const [userAvatar, setUserAvatar] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setIsAdmin(body.user.isAdmin);
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
    avatar !== "" && userId !== "" && isAdmin !== "" && name !== "";
  }, [avatar, userId, isAdmin, name]);

  fetch("http://91.227.2.183:5002/avatars_rateit/" + userId)
    .then((responce) => responce.text())
    .then((responce) => {
      setUserAvatar(responce);
    });

  navigation.setOptions({ headerShown: false });

  return (
    <SafeAreaView>
      <Card>
        <Card.Actions>
          <Button onPress={searchProducts} mode="contained">
            Wyszukaj produkt
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={ratedProducts} mode="contained">
            Oceny
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={settings} mode="contained">
            Ustawienia
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={barcode} mode="contained">
            Skanuj
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={ranking} mode="contained">
            Ranking
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={admin} mode="contained">
            admin
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Avatar.Image
          size={64}
          source={{
            uri: `data:image/jpeg;base64,${userAvatar}`,
          }}
        />

        <Paragraph>{name}</Paragraph>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
