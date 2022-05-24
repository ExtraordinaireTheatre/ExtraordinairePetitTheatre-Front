import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const StoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  // data single book
  const { bookData } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const foo = async()=>{
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backoffice-forest-admin-sr.herokuapp.com/books/${bookData._id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: data.image,
          }}
          style={styles.img}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={styles.bgdGoBack}>
            <Ionicons
              name="arrow-back-outline"
              size={16}
              color="rgb(165, 81, 69)"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            color: "rgb(226, 218, 210)",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {data.title}
        </Text>
        <Text
          style={{
            color: "rgb(226, 218, 210)",
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          {data.author}
        </Text>
        <Text style={{ color: "rgb(226, 218, 210)", fontSize: 12 }}>
          {data.duration}min
        </Text>
      </View>
      <Text style={styles.text} numberOfLines={10}>
        {data.description}
      </Text>
      <TouchableOpacity
        onPress={() => {
          foo();
          navigation.navigate("Test");
        }}
        style={styles.playContainer}
      >
        <AntDesign name="play" size={70} color="rgb(226, 218, 210)" />
      </TouchableOpacity>
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
    position: "relative",
  },
  bgdGoBack: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "rgb(226, 218, 210)",
    alignItems: "center",
    justifyContent: "center",
  },
  goBack: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  img: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  titleContainer: {
    height: "10%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 30,
    fontSize: 15,
    color: "rgb(226, 218, 210)",
    height: "20%",
    textAlign: "justify",
  },
  playContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
export default StoryScreen;
