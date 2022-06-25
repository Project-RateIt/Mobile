import React from "react";
import { SafeAreaView } from "react-native";
import { Searchbar, Button, Card, Avatar, Paragraph } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const settings = () => navigation.navigate("Settings");
  const myProducts = () => navigation.navigate("MyProducts");
  const lastProducts = () => navigation.navigate("LastProducts");
  return (
    <SafeAreaView>
      <Searchbar />
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
