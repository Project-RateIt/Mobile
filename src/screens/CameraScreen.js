import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import CameraPermission from "../components/cameraPermission/cameraPermission";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function App({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setImage(newPhoto);
  };

  if (cameraPermission === false) {
    return <CameraPermission />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {!image ? (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          flashMode={flash}
          ratio={"1:1"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" color="white" size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              <FontAwesome name="flash" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image
          source={{ uri: "data:image/jpg;base64," + image.base64 }}
          style={styles.camera}
        />
      )}

      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => setImage(null)}
            >
              <FontAwesome name="repeat" size={24} color="white" />
              <Text style={styles.text}>Ponownie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={navigation.navigate("AddProduct", { image: image })}
            >
              <FontAwesome name="check" size={24} color="white" />
              <Text style={styles.text}>Zatwierdź</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <FontAwesome name="camera" size={28} color="white" />
            <Text style={styles.text}>Zrób zdjęcie</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
