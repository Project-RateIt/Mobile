import React, { useState, useEffect } from "react";
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
import Product from "../components/product/product";
import { Searchbar } from "react-native-paper";

const MyProducts = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const [product, setProduct] = useState([]);

  const search = () => {
    fetch("http://91.227.2.183:443/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "6P1OJEMWRU_39781998_28-06-2022 22:03:14",
        query: query,
        page: pageNumber,
        userId: 39781998,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct((previousData) => [...previousData, ...data]);
      });
  };

  useEffect(() => {
    search();
  }, [pageNumber]);

  useEffect(() => {
    setProduct([]);
  }, [query]);

  const pressHandler = (item) => {
    console.log(item.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>MyProducts</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        onIconPress={search}
      />

      <FlatList
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            id={item.id}
            item={item}
            pressHandler={pressHandler}
            navigation={navigation}
          />
        )}
        onEndReached={() => setPageNumber((previous) => (previous += 1))}
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
