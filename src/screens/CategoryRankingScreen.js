import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Product from "../components/product/product";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CategoryRankingScreen = ({ navigation, route }) => {
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

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
    token !== "" && userId !== "" && getRanking();
  }, [token, userId]);

  const getRanking = () => {
    fetch("http://91.227.2.183:443/products/getCategoryRanking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        userId: userId,
        page: pageNumber,
        categoryId: route.params.item.id,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setProduct((previousData) => [...previousData, ...data]);
        });
      } else {
        console.log("-------------------------err-------------");
        console.log(token);
        console.log(userId);
        console.log(pageNumber);
        console.log(route.params.item.id);
      }
    });
  };

  useEffect(() => {
    getRanking();
  }, [pageNumber]);

  return (
    <View>
      <FlatList
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product id={item.id} item={item} navigation={navigation} />
        )}
        onEndReached={() => setPageNumber((previous) => (previous += 1))}
      />
    </View>
  );
};

export default CategoryRankingScreen;

const styles = StyleSheet.create({});
