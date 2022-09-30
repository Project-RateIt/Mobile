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
  TextInput
} from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "../components/product/product";
import { LinearGradient } from "expo-linear-gradient";
import {Colors} from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [viewedProduct, setViewedProduct] = useState([]);
  const [rankingProduct, setRankingProduct] = useState([]);
  const [searched, setSearched] = useState('');

  useEffect(() => {
    getData();
    getProductRanking();
    getViewedProduct();
  }, [token, userId]);

  const search =()=>{
    navigation.navigate("SearchProducts", {
      searchedText: searched
    })
  }

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setUserId(body.user.id);
          setToken(body.token);
          setName(body.user.name);
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

  const getProductRanking = async () => {
    await fetch("http://91.227.2.183:443/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        query,
        page: 0,
        userId,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setRankingProduct(data);
        });
      } else {
        console.warn(response);
      }
    });
  };

  const getViewedProduct = async () => {
    await fetch("http://91.227.2.183:443/products/getViewedProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        page: 0,
        userId,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setViewedProduct(data);
        });
      } else {
        console.warn(response);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Witaj, {name}</Text>
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
              placeholder='Type here...'
            />
          <TouchableOpacity style={styles.search_icon} onPress={search}>
            <Ionicons name="search" size={18} color={'rgba(0,0,0,0.5)'} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.footer}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Najlepiej oceniane</Text>
          <FlatList
            horizontal
            data={rankingProduct}
            keyExtractor={({item, index}) => index}
            renderItem={({ item }) => (
              <Product id={item.id} key={item.id} item={item} navigation={navigation} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Ostatnio przeglądane</Text>
          <FlatList
            horizontal
            data={viewedProduct}
            keyExtractor={({item, index}) => index}
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
const height_logo = height * 0.3 * 0.3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#009245",
    flex: 0.3,
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
    color: "white",
    fontWeight: "bold",
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
  search_box: {

  },
  search_input: {
    width: '90%',
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    margin: 10,
    padding:10,
    height: 50,
    borderRadius: 10,
    textAlign: 'center'
  },
  search_icon: {
    marginHorizontal: 10
  },
  search_input_content: {
    flex: 1,
    textAlign: 'center'
  }
});

export default HomeScreen;
