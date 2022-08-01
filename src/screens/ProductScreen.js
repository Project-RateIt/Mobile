import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductScreen = ({ product }) => {
  return (
    <View>
      <Text>ProductScreen</Text>
      <Text>{product.id}</Text>
      <Text>{product.name}</Text>
      <Text>{product.rateSum}</Text>
      <Text>{product.rateCount}</Text>
      <Text>{product.category}</Text>
      <Text>{product.ean}</Text>
      <Text>{product.producer}</Text>
      <Text>{product.myRate}</Text>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
