import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

const StoryScreen = ({ route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require("../assets/Charlie.jpeg")}
          style={styles.img}
        ></Image> */}
      </View>
      <View style={styles.descriptionContainer}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(165, 81, 69)",
    paddingTop: Constants.statusBarHeight,
  },
  imageContainer: {
    height: "40%",
    width: "100%",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },
});
export default StoryScreen;
