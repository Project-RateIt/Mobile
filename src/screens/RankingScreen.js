import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../components/ranking/category";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

const RankingScreen = ({ navigation }) => {
  const animation = "bounceIn";
  const [pageNumber, setPageNumber] = useState(0);
  const [category, setCategory] = useState([]);
  const [jwt, setJwt] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setJwt(body.jwt);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, [pageNumber]);

  const getCategories = async () => {
    await fetch(
      `http://91.227.2.183:83/api/products/getCategories?page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + jwt,
        },
      }
    ).then((response) => {
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
          duration={500}
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
          onEndReached={() => setPageNumber((previous) => (previous += 1))}
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
