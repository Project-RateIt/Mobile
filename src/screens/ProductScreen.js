import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ProductScreen = ({ route }) => {
  return (
    <View>
      <Text>ProductScreen</Text>
      <Text>ID produktu: {route.params.item.id}</Text>
      <Text>Nazwa produktu: {route.params.item.name}</Text>
      <Text>Suma ocen produktu: {route.params.item.rateSum}</Text>
      <Text>Ilość ocen produktu: {route.params.item.rateCount}</Text>
      <Text>Kategoria produktu: {route.params.item.category}</Text>
      <Text>Kod kreskowy produktu: {route.params.item.ean}</Text>
      <Text>Producent produktu: {route.params.item.producer}</Text>
      <Text>Twoja ocena produktu: {route.params.item.myRate}</Text>
      <View>
        <Image style={styles.image} source={{ uri: route.params.item.image }} />
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
