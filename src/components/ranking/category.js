import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import * as Animatable from "react-native-animatable";

const Category = ({ item, navigation, index, animation }) => {
  const mainCategory = () =>
    navigation.navigate("CategoryRanking", { item: item });

  const colorAr = [
    "#637aff",
    "#60c5a8",
    "#CCCCCC",
    "#ff5454",
    "#039a83",
    "#dcb834",
    "#8f06e4",
    "skyblue",
    "#ff4c98",
  ];
  const bgColor = (i) => colorAr[i % colorAr.length];

  return (
    <Animatable.View animation={animation} duration={500} delay={index * 150}>
      <View style={styles.listItem}>
        <TouchableOpacity activeOpacity={0.7} onPress={mainCategory}>
          <View style={[styles.image, { backgroundColor: bgColor(index) }]}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
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
    borderColor: Colors.lightGray,
  },
  image: {
    height: 150,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    textTransform: "capitalize",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0, 0, 0, .08)",
  },
  listEmpty: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    width: Dimensions.get("window").width / 2 - 16,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 10,
  },
  image: {
    height: 150,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
