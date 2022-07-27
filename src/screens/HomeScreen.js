import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Button, Card, Avatar, Paragraph } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const searchProducts = () => navigation.navigate("SearchProducts");
  const followedProducts = () => navigation.navigate("FollowedProducts");
  const ratedProducts = () => navigation.navigate("RatedProducts");
  const settings = () => navigation.navigate("Settings");

  navigation.setOptions({ headerShown: false });

  return (
    <SafeAreaView>
      <Card>
        <Card.Actions>
          <Button onPress={searchProducts} mode="contained">
            Wyszukaj produkt
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={followedProducts} mode="contained">
            Obserwowane produkty
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={ratedProducts} mode="contained">
            Ocenione produkty
          </Button>
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

const styles = StyleSheet.create({});

export default HomeScreen;
