import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Product from "../components/product/product";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RatedProductsScreen = ({ navigation }) => {
  const [product, setProduct] = useState([]);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setToken(body.token);
          setUserId(body.user.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  fetch("http://91.227.2.183:443/products/getRatedProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      userId: userId,
    }),
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        setProduct(data);
      });
    } else {
      console.log("-------------------------err-------------");
      console.log(response.status);
      console.log(token);
      console.log(userId);
    }
  });

  const pressHandler = (item) => {
    console.log(item.id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        horizontal={false}
        style={{ flex: 1 }}
        numColumns={2}
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product id={item.id} item={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RatedProductsScreen;
