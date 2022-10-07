import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../components/ranking/category";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

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
    getCategories();
  }, []);

  const getCategories = async () => {
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
          setCategory(data);
        });
      } else {
        console.log(response.text);
      }
    });
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={styles.container}>
        <FlatList
          data={category}
          keyExtractor={(id) => id}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <Category id={item.id} item={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
