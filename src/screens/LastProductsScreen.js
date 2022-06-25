import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const LastProducts = () => {
  const [products, setProducts] = useState([
    { name: "Ostatni produkt 1", id: "1" },
    { name: "Ostatni produkt 2", id: "2" },
    { name: "Ostatni produkt 3", id: "3" },
    { name: "Ostatni produkt 4", id: "4" },
    { name: "Ostatni produkt 5", id: "5" },
    { name: "Ostatni produkt 6", id: "6" },
    { name: "Ostatni produkt 7", id: "7" },
    { name: "Ostatni produkt 8", id: "8" },
    { name: "Ostatni produkt 9", id: "9" },
  ]);

  const pressHandler = (id) => {
    console.log(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>LastProducts</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => pressHandler(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingTop: 25,
  },
  listItem: {
    backgroundColor: "purple",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
    alignItems: "center",
    fontSize: 20,
  },
});

export default LastProducts;
