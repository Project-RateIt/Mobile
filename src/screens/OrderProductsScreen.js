import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Product from "../components/product/product";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderProductsScreen = ({ navigation }) => {
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

  fetch("http://91.227.2.183:443/admin/getOrderProduct", {
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

  return (
    <View>
      <Text>OrderProductsScreen</Text>
      <FlatList
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product id={item.id} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default OrderProductsScreen;

const styles = StyleSheet.create({});
