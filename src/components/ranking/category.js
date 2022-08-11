import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Category = ({ item, navigation }) => {
  const mainCategory = () =>
    navigation.navigate("CategoryRanking", { item: item });

  return (
    <View style={styles.listItem}>
      <Pressable style={styles.container} onPress={mainCategory}>
        <Text>{item.name}</Text>
      </Pressable>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderWidth: 1,
  },
  container: {
    backgroundColor: "green",
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
