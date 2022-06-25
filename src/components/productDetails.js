import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

<View style={styles.listItem}>
  <Pressable onPress={() => pressHandler(item)}>
    <Image style={styles.image} source={require("../../assets/prof.jpg")} />
    <View style={styles.info}>
      <Text>{item.name}</Text>
      <Text>{item.producer}</Text>
    </View>
  </Pressable>
  <View>
    <Button icon="heart">Zaobserwuj</Button>
    <Button icon="star">Oceń</Button>
  </View>
</View>;
