import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("screen");

const Product = ({ item, navigation, id }) => {
  const [rating, setRating] = useState();
  const rate = () => navigation.navigate("Rate", { item: item });
  const note = () => navigation.navigate("Note", { item: item });
  const productDetails = () =>
    navigation.navigate("ProductDetails", { item: item });

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  let avgRate = Math.round(item.rateSum / item.rateCount);
  useEffect(() => {
    if (item.rateSum === 0 || item.rateCount === 0) {
      setRating("Brak ocen");
    } else {
      setRating("Ocena " + avgRate + "/10");
    }
  }, []);

  return (
    <LinearGradient
      colors={["#009245", "#8cc631"]}
      locations={[0.5,0.8]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.item}
    >
      <TouchableWithoutFeedback onPress={productDetails} style={{width:'100%', flex: 1}}>
  <View>
        <View style={styles.box}>
          <View style={styles.image_box}>
          <TouchableOpacity
              onPress={toggleBottomNavigationView}
              style={styles.button}
            >
              <Entypo name="dots-three-vertical" size={18} color="#009245" />
            </TouchableOpacity>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.2)"]}
              style={styles.image_shadow}
              locations={[0.7, 1]}
            >
              </LinearGradient>
            <View style={styles.image_container}>

              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            
          </View>
          <View style={styles.text_container}>
            <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
          </View>
          <View style={styles.price_container}>
            <View style={styles.price}>
              <Text style={styles.textPrice}>{rating}</Text>
            </View>
            
          </View>
        </View>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                alignContent: "space-between",
              }}
            >
              <Button
                style={{ flex: 1 }}
                title="Więcej szczegółów"
                onPress={productDetails}
              />
              <Button style={{ flex: 1 }} title="Oceń" onPress={rate} />
              <Button style={{ flex: 1 }} title="Notatka" onPress={note} />
              <Button
                style={{ flex: 1 }}
                title="Anuluj"
                onPress={() => setVisible(false)}
              />
            </View>
          </View>
        </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};
const widthBox = width / 2.15;
const styles = StyleSheet.create({
  item: {
    margin: 5,
    flex: 1,
    borderRadius: 10,
    padding: 0,
    width: widthBox,
    borderRadius: 10
  },
  image_shadow: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999
  },
  image_container: {
    width: 120,
    height: 120,
  },
  image_box: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    padding: 0,
    position: 'relative',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },  
  image: {
    width: "100%",
    height: "90%",
  },
  box: {
    //width: widthBox,
  },
  text_container: {
    justifyContent: "center",
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  name: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  rating: {
    flexDirection: "row",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    margin: 10,
    width: 30,
    height: 30,
    //backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'flex-end'
  },
  price_container: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 10,
  },
  price: {
    //backgroundColor: "white",
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '90%',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textPrice: {
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Product;
