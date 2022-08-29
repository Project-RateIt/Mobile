import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import Product from "../components/product/product";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchProductsScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

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
    token !== "" && userId !== "" && search();
  }, [token, userId]);

  const search = () => {
    fetch("http://91.227.2.183:443/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        query,
        page: pageNumber,
        userId,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setProduct((previousData) => [...previousData, ...data]);
        });
      } else {
        console.warn(response);
      }
    });
  };

  useEffect(() => {
    search();
  }, [pageNumber, query]);

  useEffect(() => {
    setProduct([]);
  }, [query]);

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        onIconPress={search}
        onSubmitEditing={search}
      />

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

export default SearchProductsScreen;
