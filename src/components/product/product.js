import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";

const Product = ({ item, pressHandler, navigation, id }) => {
  const rate = () => navigation.navigate("Rate", { id: id });
  const follow = () => navigation.navigate("Reset");

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
        <Button title="Polub" />
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
