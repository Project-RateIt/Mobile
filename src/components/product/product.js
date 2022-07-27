import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Product = ({ item, pressHandler, navigation, id }) => {
  const [followed, setFollowed] = useState(false);
  const rate = () => navigation.navigate("Rate", { id: id });
  const note = () => navigation.navigate("Note", { id: id });

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

  const follow = () => {
    if (followed == false) {
      fetch("http://91.227.2.183:443/products/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userId,
          productId: id,
        }),
      }).then((responce) => {
        if (responce.status === 200) {
          alert("Obserwujesz");
        } else {
          alert("Spróbuj ponownie");
        }
      });
      setFollowed((isFollowed) => !isFollowed);
      console.log(followed);
    } else {
      fetch("http://91.227.2.183:443/products/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userId,
          productId: id,
        }),
      }).then((responce) => {
        if (responce.status === 200) {
          alert("Nie obserwujesz");
        } else {
          alert("Spróbuj ponownie");
        }
      });
      setFollowed((isFollowed) => !isFollowed);
      console.log(followed);
    }
  };

  return (
    <View style={styles.listItem}>
      <Pressable style={styles.container} onPress={() => pressHandler(item)}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.info}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.producer}</Text>
          <Text style={styles.text}>
            Ocena {item.rateSum / item.rateCount}/10
          </Text>
        </View>
      </Pressable>
      <View style={styles.action}>
        <Button title={followed ? "followed" : "follow"} onPress={follow} />
        <Button title="Oceń" onPress={rate} />
        <Button title="Notatka" onPress={note} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    flexDirection: "row",
  },
  container: {
    backgroundColor: "red",
    flexDirection: "row",
    flex: 2,
  },
  image: {
    flex: 1,
    width: 64,
    height: 100,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
  action: {
    backgroundColor: "green",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Product;
