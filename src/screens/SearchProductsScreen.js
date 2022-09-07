import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 5,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        onIconPress={search}
        onSubmitEditing={search}
      />

      <FlatList
        horizontal={false}
        style={{ flex: 1 }}
        numColumns={2}
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product id={item.id} item={item} navigation={navigation} />
        )}
        onEndReachedThreshold={3}
        onEndReached={() => setPageNumber((previous) => (previous += 1))}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SearchProductsScreen;
