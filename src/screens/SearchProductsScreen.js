import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Product from "../components/product/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const SearchProductsScreen = ({ navigation, route }) => {
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
      console.log(response);
      if (response.status === 200) {
        response.json().then((data) => {
          setProduct((previousData) => [...previousData, ...data]);
        });
      } else {
        console.log("wywala");
      }
    });
  };

  useEffect(() => {
    search();
    setProduct([]);
  }, [pageNumber, query]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.search_input}>
        <TextInput
          placeholder="Wyszukaj produkt"
          onChangeText={setQuery}
          value={query}
          style={styles.search_input_content}
          onSubmitEditing={search}
        />
        <TouchableOpacity
          style={styles.search_icon}
          onPress={() => {
            search;
            Keyboard.dismiss();
          }}
        >
          <Ionicons name="search" size={18} color={"rgba(0,0,0,0.5)"} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={false}
        style={{ flex: 1 }}
        numColumns={2}
        data={product}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product id={item.id} item={item} navigation={navigation} />
        )}
        onEndReached={() => setPageNumber((previous) => (previous += 1))}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SearchProductsScreen;

const styles = StyleSheet.create({
  search_input: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    margin: "2.5%",
    padding: 10,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
  },
  search_icon: {
    marginHorizontal: 10,
  },
  search_input_content: {
    flex: 1,
    textAlign: "center",
  },
});
