import React, { useState } from "react";
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
import Product from "../components/product";

const MyProducts = () => {
  const [products, setProducts] = useState([
    {
      name: "Mój produkt 1",
      id: "1",
      producer: "Producent 1",
      followed: true,
      rated: "8",
      img: "../../assets/prof.jpg",
    },
    {
      name: "Mój produkt 2",
      id: "2",
      producer: "Producent 1",
      followed: true,
      rated: null,
      img: "../../assets/prof.jpg",
    },
    { name: "Mój produkt 3", id: "3" },
    { name: "Mój produkt 4", id: "4" },
    { name: "Mój produkt 5", id: "5" },
    { name: "Mój produkt 6", id: "6" },
    { name: "Mój produkt 7", id: "7" },
    { name: "Mój produkt 8", id: "8" },
    { name: "Mój produkt 9", id: "9" },
    { name: "Mój produkt 10", id: "10" },
    { name: "Mój produkt 11", id: "11" },
    { name: "Mój produkt 12", id: "12" },
    { name: "Mój produkt 13", id: "13" },
    { name: "Mój produkt 14", id: "14" },
    { name: "Mój produkt 15", id: "15" },
    { name: "Mój produkt 16", id: "16" },
    { name: "Mój produkt 17", id: "17" },
    { name: "Mój produkt 18", id: "18" },
    { name: "Mój produkt 19", id: "19" },
    { name: "Mój produkt 20", id: "20" },
  ]);

  const pressHandler = (item) => {
    console.log(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>MyProducts</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product item={item} pressHandler={pressHandler} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 25,
  },
});

export default MyProducts;
