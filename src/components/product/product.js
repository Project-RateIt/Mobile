import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { BottomSheet } from "react-native-btr";
import { Entypo } from "@expo/vector-icons";

const Product = ({ item, navigation, id }) => {
  const [rating, setRating] = useState();
  const rate = () => navigation.navigate("Rate", { id: id });
  const note = () => navigation.navigate("Note", { id: id });
  const productDetails = () =>
    navigation.navigate("ProductDetails", { item: item });

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
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
    <View style={styles.listItem}>
      <Pressable style={styles.container} onPress={productDetails}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.info}>
          <View style={styles.text}>
            <Text style={styles.a}>{item.name}</Text>
            <Text style={styles.a}>{rating}</Text>
          </View>
          <Pressable style={styles.dots} onPress={toggleBottomNavigationView}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </Pressable>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
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
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 1,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1,
  },
  text: {
    flex: 9,
  },
  dots: {
    flex: 2,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    backgroundColor: "green",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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
