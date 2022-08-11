import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";

const Product = ({ item, navigation, id }) => {
  const [rating, setRating] = useState();
  const rate = () => navigation.navigate("Rate", { id: id });
  const note = () => navigation.navigate("Note", { id: id });
  const productDetails = () =>
    navigation.navigate("ProductDetails", { item: item });

  let avgRate = Math.round(item.rateSum / item.rateCount);
  useEffect(() => {
    if (item.rateSum === 0 || item.rateCount === 0) {
      setRating("Brak ocen");
    } else {
      setRating("Ocena " + avgRate + "/10");
    }
  }, []);

  return (
    <View style={styles.listItem}>
      <Pressable style={styles.container} onPress={productDetails}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.info}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.producer}</Text>
          <Text style={styles.text}>{rating}</Text>
        </View>
      </Pressable>
      <View style={styles.action}>
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default Product;
