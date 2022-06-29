import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const Button = ({ name }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 5,
          backgroundColor: "blue",
          margin: 5,
          borderRadius: 5,
        }}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
