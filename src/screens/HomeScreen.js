import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "../components/product/product";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation, route }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [userId, setUserId] = useState("");
  const [jwt, setJwt] = useState("");
  const [name, setName] = useState("");
  const [viewedProduct, setViewedProduct] = useState([]);
  const [rankingProduct, setRankingProduct] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const search = () => {
    navigation.navigate("SearchProducts", {
      searchedText: searched,
    });
  };

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          console.log(body);
          setJwt(body.jwt);
          setName(body.name);
          setUserId(body.id);
          setViewedProduct(body.viewedProduct);
          setRankingProduct(body.ratedProducts);
        }
      });
      fetch("http://91.227.2.183:5002/avatars_rateit/" + userId)
        .then((response) => response.text())
        .then((response) => {
          setUserAvatar(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.legendTitle}>Witaj, </Text>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Image
          animation="bounceIn"
          duration={1500}
          source={{
            uri: `data:image/jpeg;base64,${userAvatar}`,
          }}
          style={styles.logo}
          resizeMode={"stretch"}
        />
      </View>
      <View style={styles.search_box}>
        <View style={styles.search_input}>
          <TextInput
            style={styles.search_input_content}
            onChangeText={setSearched}
            value={searched}
            placeholder="Wyszukaj produkt"
          />
          <TouchableOpacity style={styles.search_icon} onPress={search}>
            <Ionicons name="search" size={18} color={"rgba(0,0,0,0.5)"} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.footer}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Najlepiej oceniane</Text>
          <FlatList
            horizontal
            data={rankingProduct}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item }) => (
              <Product
                id={item.id}
                key={item.id}
                item={item}
                navigation={navigation}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Ostatnio przeglądane</Text>
          <FlatList
            horizontal
            data={viewedProduct}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item }) => (
              <Product id={item.id} item={item} navigation={navigation} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const { height } = Dimensions.get("screen");
const height_logo = height * 0.27 * 0.27;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "transparent",
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  footer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  box: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "flex-start",
    marginTop: 10,
  },
  boxTitle: {
    justifyContent: "center",
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 18,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
  },
  title: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 30,
  },
  legendTitle: {
    color: "rgba(0,0,0,0.3)",
    fontSize: 30,
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  search_box: {},
  search_input: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    margin: 10,
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
  headerText: {
    flexDirection: "row",
  },
});

export default HomeScreen;
