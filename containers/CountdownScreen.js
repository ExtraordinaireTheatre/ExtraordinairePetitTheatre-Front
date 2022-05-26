import React from "react";
import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

const CountDownScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const countDown = setInterval(() => {
      setCount((prevState) =>
        prevState > 0 ? prevState - 1 : (prevState = 0)
      );
    }, 1000);
    return () => {
      clearInterval(countDown);
    };
  }, []);

  // useEffect(() => {
  //   if (count === 0) {
  //     navigation.navigate("Display", { bookData: route.params.bookData });
  //   }
  // }, [count]);
  const foo = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  };

  useEffect(() => {
    if (count === 0) {
      foo();
      navigation.navigate("TestUser", { bookData: route.params.bookData });
    }
  }, [count]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Entypo name="cross" size={24} color="rgb(165, 81, 69)" />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Text style={styles.title}>La représentation va commencer</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            Pendant que nos acteurs se préparent placez votre téléphone dans le
            réceptacle situé à l'arrière de votre théâtre, puis débuter votre
            lecture sans précipitation
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={{ fontSize: 100, color: "rgb(226, 218, 210)" }}>
            {count}
          </Text>
        </View>
      </View>
      <View style={styles.textView}>
        <Text style={styles.lastText}>Bon spectacle à tous</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(165, 81, 69)",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  goBack: {
    backgroundColor: "rgb(226, 218, 210)",
    borderRadius: 50,
    padding: 15,
    color: "rgb(165, 81, 69)",
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    color: "rgb(226, 218, 210)",
  },
  main: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "rgb(226, 218, 210)",
    lineHeight: 35,
  },
  textView: {
    alignItems: "center",
    // borderColor: "yellow",
    // borderWidth: 5,
    marginTop: 30,
  },
  lastText: {
    fontSize: 30,
    textTransform: "uppercase",
    color: "rgb(226, 218, 210)",
    marginTop: 30,
  },
});

export default CountDownScreen;
