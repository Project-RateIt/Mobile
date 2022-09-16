import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated, Alert } from "react-native";
import { useDispatch } from "react-redux";
import LottieView from "lottie-react-native";
import navigationActions from "../../navigation/navigationActions";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../../helpers/deviceStorage";
import { APP_URL, Constants } from "../../common/constants";
import AppText from "../../components/AppText";
import APP_COLORS from "../../common/colors";

const StartupScreen = () => {
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState < boolean > false;
  const [loadingAnimation, setLoadingAnimation] = useState < boolean > true;
  let animationProgress = useRef(new Animated.Value(0)).current;
  const [alertShown, setAlertShown] = useState < boolean > false;

  useEffect(() => {
    startApp();
  }, []);

  useEffect(() => {
    if (loadingAnimation) return;

    if (isUser) {
      dispatch(navigationActions.setNavigation("App", "DashboardScreen"));
    } else {
      dispatch(navigationActions.setNavigation("Auth", "WelcomeScreen"));
    }
  });

  const startApp = async () => {
    if (alertShown) return;
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => setLoadingAnimation(false));

    const isBackendOnline = await testApi();
    if (!isBackendOnline) {
      setAlertShown(true);
      Alert.alert(
        "Błąd połączenia",
        "Upewnij się ze masz połączenie z internetem, lub spróbuj ponownie później.",
        [
          {
            text: "Spróbuj ponownie",
            onPress: () => {
              setAlertShown(false);
              startApp();
            },
          },
        ]
      );
      return;
    }

    await checkIsUserExist();
  };

  const testApi = async () => {
    return await fetch(Constants.URL).then((response) => {
      return response.status === 200;
    });
  };

  const checkIsUserExist = async () => {
    try {
      const user = await getFromAsyncStorage("user");
      if (user === null) return;

      const { id, token } = user;
      const body = { id, token };

      fetch(APP_URL.isUserExist, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          res.text().then(async (response) => {
            if (res.status === 409) {
              saveToAsyncStorage("user", JSON.stringify(null));
              setIsUser(false);
              return;
            }

            const updatedUser = { ...JSON.parse(response), token };

            if (res.status === 200) {
              await saveToAsyncStorage("user", JSON.stringify(updatedUser));

              await dispatch({
                type: "AUTH",
                user: updatedUser,
              });
              setIsUser(true);
              return;
            }
          });
        })
        .catch((e) => {});
    } catch (err) {
      setIsUser(false);
    }
  };

  return (
    <View style={styles.screen}>
      <LottieView
        style={styles.lottie}
        source={require("../../../assets/walkwards.json")}
        progress={animationProgress}
        renderMode="HARDWARE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.white,
  },
  lottie: {
    width: Dimensions.get("window").width * 0.4,
    height: 200,
    marginBottom: 64,
  },
});

export default StartupScreen;
