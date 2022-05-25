import React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import Constants from "expo-constants";

import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";

const AfficheScreen = ({ navigation, portrait }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tomesAffiche, setTomeAffiche] = useState();
  console.log(Dimensions.get("screen").height / 3);
  useEffect(() => {
    portrait;
    const getAffiche = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          "https://backoffice-forest-admin-sr.herokuapp.com/tome"
        );
        setTomeAffiche(response.data);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getAffiche();
  }, []);
  return isLoading ? (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "rgb(165, 81, 69)",
      }}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}>
          <View style={styles.buttonCircle}>
            <MaterialIcons
              style={styles.settingsIcon}
              name="settings"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>à l'affiche</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.carousselContainer}>
          <ScrollView
            horizontal={true}
            style={styles.caroussel}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            showsHorizontalScrollIndicator={false}>
            {tomesAffiche &&
              tomesAffiche.map((tome, index) => {
                return (
                  <TouchableOpacity
                    style={styles.itemCaroussel}
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("AllStory", { tome: tome });
                    }}>
                    <View style={styles.viewImageCaroussel}>
                      <Image
                        style={styles.imageCaroussel}
                        source={{ uri: tome.image }}
                        resizeMode={"contain"}
                      />
                    </View>
                    <View style={styles.carousselTitleContainer}>
                      <Text style={styles.titleCaroussel}>{tome.title}</Text>
                      <Text style={styles.subTitleCaroussel}>
                        Tome {tome.tome}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>

        <View style={styles.containerEllipse}>
          <TouchableOpacity style={styles.ellipse}>
            <MaterialCommunityIcons
              style={styles.iconeEllipse}
              name="ticket"
              size={24}
              color="rgb(165, 81, 69)"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(165, 81, 69)",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonCircle: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(226, 218, 210, 0.5)",
  },
  settingsIcon: {
    color: "rgb(226, 218, 210)",
    opacity: 1,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    // borderColor: "yellow",
    // borderWidth: 2,
    marginTop: 30,
    paddingBottom: 20,
  },
  title: {
    color: "rgb(226, 218, 210)",
    fontSize: 20,
    textTransform: "uppercase",
    // borderColor: "yellow",
    // borderWidth: 2,
  },
  carousselContainer: {
    // borderColor: "blue",
    // borderWidth: 1,
    height: "70%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  itemCaroussel: {
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "yellow",
    // borderWidth: 3,
    marginHorizontal: 65,
    height: "100%",
  },
  viewImageCaroussel: {
    height: "75%",
    width: "100%",
  },
  imageCaroussel: {
    height: "100%",
    width: "100%",
    // borderColor: "rgb(226, 218, 210)",
    // borderWidth: 2,
  },
  carousselTitleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  titleCaroussel: {
    color: "rgb(226, 218, 210)",
    fontSize: 24,
  },
  subTitleCaroussel: {
    color: "rgb(226, 218, 210)",
    fontSize: 22,
  },
  containerEllipse: {
    marginTop: "5%",
    position: "absolute",
    top: Dimensions.get("screen").height - Dimensions.get("screen").height / 3,
  },
  ellipse: {
    backgroundColor: "rgb(226, 218, 210)",
    padding: 50,
    borderRadius: 100,
  },
  iconeEllipse: {
    height: 40,
    position: "absolute",
    alignSelf: "center",
    top: 15,
  },
});
export default AfficheScreen;
