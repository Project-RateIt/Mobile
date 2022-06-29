import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Searchbar, Button, Card, Avatar, Paragraph } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const settings = () => navigation.navigate("Settings");
  const myProducts = () => navigation.navigate("MyProducts");
  const lastProducts = () => navigation.navigate("LastProducts");

  const [query, setQuery] = useState("");

  const [product, setProduct] = useState({
    id: "",
    name: "",
    rateSum: 0,
    rateCount: 0,
    isFollow: false,
    isRated: false,
    myRate: 0,
    image: "",
    category: "",
    ean: "",
    producer: "",
  });

  const search = () => {
    fetch("http://91.227.2.183:443/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "YP2QCBT5IR_39781998_28-06-2022 14:30:56",
        query: query,
        page: 1,
        userId: 99436860,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(product);
      });
  };

  return (
    <SafeAreaView style={{ paddingTop: 25 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        onIconPress={search}
      />
      <Card>
        <Card.Actions>
          <Button onPress={myProducts} mode="contained">
            Moje produkty
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={lastProducts} mode="contained">
            Ostatnie produkty
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button mode="contained">Najlepsze produkty</Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={settings} mode="contained">
            Ustawienia
          </Button>
        </Card.Actions>
      </Card>

      <Card>
        <Avatar.Image size={64} source={require("../../assets/prof.jpg")} />
        <Paragraph>NAME</Paragraph>
      </Card>
    </SafeAreaView>
  );
};

export default HomeScreen;
