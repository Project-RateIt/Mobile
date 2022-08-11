import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../components/ranking/category";

const RankingScreen = ({ navigation }) => {
  const [category, setCategory] = useState([]);
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
    token !== "" && userId !== "" && getCategories();
  }, [token, userId]);

  const getCategories = () => {
    console.log("token");
    console.log(token);
    console.log(userId);
    fetch("http://91.227.2.183:443/products/getCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        userId: userId,
      }),
    }).then((responce) => {
      if (responce.status === 200) {
        responce.json().then((data) => {
          setCategory((previousData) => [...previousData, ...data]);
        });
      } else {
        console.log(error);
      }
    });
  };

  return (
    <View>
      <Text>RankingScreen</Text>
      <FlatList
        numColumns={3}
        data={category}
        keyExtractor={(id) => id}
        renderItem={({ item }) => (
          <Category id={item.id} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
