import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

const StoryScreen = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // data single book
  const { bookData } = route.params;

  console.log(bookData);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text>STORY</Text>
        <Button
          title="retour"
          onPress={() => {
            navigation.goBack();
          }}
        />
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
