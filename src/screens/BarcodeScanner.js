import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraPermission from "../components/cameraPermission/cameraPermission";
import LottieView from "lottie-react-native";

export default function BarcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoading(true);
    await fetch("http://91.227.2.183:443/products/checkProduct", {
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
            onPress: () => {
              setScanned(false), setLoading(false);
            },
          },
          {
            text: "Dalej",
            onPress: () => {
              setScanned(false);
              setLoading(false);
              navigation.navigate("ProductDetails", {
                item: parsedResopnse,
              });
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
              onPress: () => {
                setScanned(false), setLoading(false);
              },
            },
            {
              text: "Dodaj produkt",
              onPress: () => {
                setScanned(false);
                setLoading(false);
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
      {loading && (
        <View style={styles.container}>
          <LottieView
            style={styles.lottie}
            source={require("../../assets/lottie/5647-scan-barcode.json")}
            autoPlay
            loop
          />
        </View>
      )}
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
