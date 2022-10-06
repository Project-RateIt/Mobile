import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Colors} from '../../constants/colors'

const Category = ({ item, navigation }) => {
  const mainCategory = () =>
    navigation.navigate("CategoryRanking", { item: item });

    return ( 
      <TouchableOpacity style={styles.container} onPress={mainCategory}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
      );

  // return (
  //   <LinearGradient
  //     style={styles.listItem}
  //     start={{ x: 0, y: 1 }}
  //     end={{ x: 1, y: 0 }}
  //     colors={["#009245", "#8cc631"]}
  //   >
  //     <TouchableOpacity style={styles.container} onPress={mainCategory}>
  //       <Text style={styles.text}>{item.name}</Text>
  //     </TouchableOpacity>
  //   </LinearGradient>
  // );
};

export default Category;

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    margin: 1,
  },
  container: {
    margin: 10,
    borderRadius: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGray
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
