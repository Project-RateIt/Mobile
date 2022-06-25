import React from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Appbar, Button } from "react-native-paper";

const Product = ({ item, pressHandler }) => {
  return (
    <View style={styles.listItem}>
      <Pressable style={styles.container} onPress={() => pressHandler(item)}>
        <Image style={styles.image} source={require("../../assets/prof.jpg")} />
        <View style={styles.info}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.producer}</Text>
          <Text style={styles.text}>Ocena {item.rated}/10</Text>
        </View>
      </Pressable>
      <View style={styles.action}>
        <Button icon="heart" style={styles.button}></Button>
        <Button icon="star" style={styles.button}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "purple",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    flex: 2,
  },
  image: {
    flex: 1,
    width: 64,
    height: 100,
  },
  info: {
    alignItems: "center",
    flex: 1,
  },
  text: {
    justifyContent: "center",
  },
  action: {
    flex: 1,
    flexDirection: "column",
  },
  button: {},
});

export default Product;
