import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../components/ranking/category";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

const RankingScreen = ({ navigation }) => {
  const animation = "bounceIn";

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

  const ListEmptyComponent = () => {
    const anim = {
      0: { translateY: 0 },
      0.25: { translateY: 50 },
      0.5: { translateY: 0 },
      0.75: { translateY: -50 },
      1: { translateY: 0 },
    };
    return (
      <View style={[styles.listEmpty]}>
        <Animatable.Text
          animation={anim}
          easing="ease-in-out"
          duration={300}
          style={{ fontSize: 24 }}
          iterationCount="infinite"
        >
          Trwa ładowanie
        </Animatable.Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animatable.View easing={"ease-in-out"} duration={500}>
        <FlatList
          data={category}
          keyExtractor={(id) => id}
          numColumns={2}
          renderItem={({ item, index }) => (
            <Category
              item={item}
              navigation={navigation}
              animation={animation}
              index={index}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0, 0, 0, .08)",
  },
  listEmpty: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    width: Dimensions.get("window").width / 2 - 16,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 10,
  },
  image: {
    height: 150,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "grey",
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default RankingScreen;
