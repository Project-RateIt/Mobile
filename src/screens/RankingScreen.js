import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../components/ranking/category";
import { SafeAreaView } from "react-native-safe-area-context";

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
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setCategory((previousData) => [...previousData, ...data]);
        });
      } else {
        console.log(error);
      }
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        horizontal={false}
        numColumns={3}
        data={category}
        keyExtractor={(id) => id}
        renderItem={({ item }) => (
          <Category id={item.id} item={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
