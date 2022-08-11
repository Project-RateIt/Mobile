import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Avatar, Paragraph } from "react-native-paper";

const HomeScreen = ({ navigation, route }) => {
  const searchProducts = () => navigation.navigate("SearchProducts");
  const ratedProducts = () => navigation.navigate("RatedProducts");
  const settings = () => navigation.navigate("Settings");
  const barcode = () => navigation.navigate("Barcode");
  const ranking = () => navigation.navigate("Ranking");
  const admin = () => navigation.navigate("Admin");

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
        <Card.Actions>
          <Button onPress={barcode} mode="contained">
            Skaner roboczy
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Actions>
          <Button onPress={ranking} mode="contained">
            Ranking
          </Button>
        </Card.Actions>
      </Card>
      {/* {route.params.admin && (
        <Card>
          <Card.Actions>
            <Button onPress={admin} mode="contained">
              admin
            </Button>
          </Card.Actions>
        </Card>
      )} */}
      <Card>
        <Avatar.Image size={64} source={require("../../assets/prof.jpg")} />
        <Paragraph>NAME</Paragraph>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
