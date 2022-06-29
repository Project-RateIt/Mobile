import React from "react";
import { View, Text } from "react-native";

const productDetails = () => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.producer}</Text>
      <Text>{item.id}</Text>
    </View>
  );
};

export default productDetails;
