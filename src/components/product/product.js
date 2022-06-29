import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";

const Product = ({ item, pressHandler, navigation, id }) => {
  const [followed, setFollowed] = useState(false);
  const rate = () => navigation.navigate("Rate", { id: id });
  const follow = () => {
    if (followed == false) {
      fetch("http://91.227.2.183:443/products/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "6P1OJEMWRU_39781998_28-06-2022 22:03:14",
          userId: 39781998,
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
          token: "6P1OJEMWRU_39781998_28-06-2022 22:03:14",
          userId: 39781998,
          productId: id,
        }),
      }).then((responce) => {
        console.log(followed);
        if (responce.status === 200) {
          alert("Nie obserwujesz");
        } else {
          alert("Spróbuj ponownie");
        }
      });
      setFollowed((isFollowed) => !isFollowed);
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
