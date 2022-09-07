import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "../components/product/product";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const SubcategoryRankingScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    getRanking();
  }, [pageNumber]);

  const getRanking = () => {
    fetch("http://91.227.2.183:443/products/getCategoryRanking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        userId: userId,
        categoryId: route.params.item.id,
        page: pageNumber,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setCategory((previousData) => [...previousData, ...data]);
        });
      } else {
      }
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        columnWrapperStyle={styles.row}
        numColumns={2}
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product id={item.id} item={item} navigation={navigation} />
        )}
        onEndReached={() => setPageNumber((previous) => (previous += 1))}
      />
    </SafeAreaView>
  );
};

export default SubcategoryRankingScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
