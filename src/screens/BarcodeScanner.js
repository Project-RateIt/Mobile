import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraPermission from "../components/cameraPermission/cameraPermission";

export default function BarcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const getData = () => {
    try {
      AsyncStorage.getItem("body").then((value) => {
        if (value != null) {
          let body = JSON.parse(value);
          setToken(body.token);
          setUserId(body.user.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    fetch("http://91.227.2.183:443/products/checkProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        ean: data.toString(),
        userId: userId,
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        const parsedResopnse = await response.json();
        Alert.alert(null, parsedResopnse.name, [
          {
            text: "Ponownie",
            onPress: () => setScanned(false),
          },
          {
            text: "Dalej",
            onPress: () => {
              navigation.navigate("ProductDetails", {
                item: parsedResopnse,
              }),
                setScanned(false);
            },
          },
        ]);
      }
      if (response.status === 409) {
        Alert.alert(
          "Niestety nie mamy tego produktu",
          "Kliknij dodaj aby dodać",
          [
            {
              text: "Ponownie",
              onPress: () => setScanned(false),
            },
            {
              text: "Dodaj produkt",
              onPress: () => {
                setScanned(false);
                navigation.navigate("AddProduct", { ean: data.toString() });
              },
            },
          ]
        );
      } else {
        console.log(error);
      }
    });
  };

  if (hasPermission === null) {
    return <CameraPermission />;
  }
  if (hasPermission === false) {
    return <CameraPermission />;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
