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
  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://extraordinaire-petit-theatre-w.herokuapp.com/books/${route.params.id}`
  //       );
  //       console.log(response.data);
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // isLoading ? (
  //   <ActivityIndicator />
  // ) :
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Charlie.jpeg")}
          style={styles.img}
        ></Image>
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            color: "rgb(226, 218, 210)",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Cendrillon
        </Text>
        <Text style={{ color: "rgb(226, 218, 210)", fontWeight: "bold" }}>
          Charles Perrault
        </Text>
        <Text style={{ color: "rgb(226, 218, 210)" }}>7min</Text>
      </View>
      <Text style={styles.text} numberOfLines={10}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
        blanditiis dolor, hic repudiandae quisquam tempora perferendis, tenetur
        ad unde eius ab architecto praesentium, alias excepturi possimus
        repellendus eveniet dicta mollitia?
      </Text>
      <View style={styles.playContainer}>
        <AntDesign name="play" size={70} color="rgb(226, 218, 210)" />
      </View>
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
  titleContainer: {
    height: "10%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 30,
    fontSize: 15,
    color: "rgb(226, 218, 210)",
    height: "20%",
    // backgroundColor: "blue",
  },
  playContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
export default StoryScreen;
