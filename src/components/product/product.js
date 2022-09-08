import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Product = ({ item, navigation, id }) => {
  const [rating, setRating] = useState();
  const rate = () => navigation.navigate("Rate", { item: item });
  const note = () => navigation.navigate("Note", { item: item });
  const productDetails = () =>
    navigation.navigate("ProductDetails", { item: item });

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  let avgRate = Math.round(item.rateSum / item.rateCount);
  useEffect(() => {
    if (item.rateSum === 0 || item.rateCount === 0) {
      setRating("Brak ocen");
    } else {
      setRating("Ocena " + avgRate + "/10");
    }
  }, []);

  return (
    <LinearGradient
      colors={["#009245", "#8cc631"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.item}
    >
      <TouchableOpacity onPress={productDetails}>
        <View>
          <View style={styles.image_container}>
            <Image style={styles.image} source={{ uri: item.image }} />
          </View>
          <View style={styles.text_container}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View style={styles.price_container}>
            <View style={styles.price}>
              <Text style={styles.textPrice}>{rating}</Text>
            </View>
            <TouchableOpacity
              onPress={toggleBottomNavigationView}
              style={styles.button}
            >
              <Entypo name="dots-three-vertical" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                alignContent: "space-between",
              }}
            >
              <Button
                style={{ flex: 1 }}
                title="Więcej szczegółów"
                onPress={productDetails}
              />
              <Button style={{ flex: 1 }} title="Oceń" onPress={rate} />
              <Button style={{ flex: 1 }} title="Notatka" onPress={note} />
              <Button
                style={{ flex: 1 }}
                title="Anuluj"
                onPress={() => setVisible(false)}
              />
            </View>
          </View>
        </BottomSheet>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    flex: 1,
    borderRadius: 10,
  },
  image_container: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text_container: {
    justifyContent: "center",
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  name: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  rating: {
    flexDirection: "row",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  price_container: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 10,
  },
  price: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  textPrice: {
    color: "green",
    fontWeight: "bold",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Product;
