import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Subcategory = ({ item, navigation }) => {
  const mainCategory = () =>
    navigation.navigate("SubategoryRanking", { item: item });

  return (
    <LinearGradient
      style={styles.listItem}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#009245", "#8cc631"]}
    >
      <TouchableOpacity style={styles.container} onPress={mainCategory}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Subcategory;

const styles = StyleSheet.create({
  listItem: {
    margin: 1,
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
