import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  Button,
} from "react-native";

import Constants from "expo-constants";

import { MaterialIcons } from "@expo/vector-icons";

import axios from "axios";
const { width, height } = Dimensions.get("window");

const AfficheScreen = ({ navigation, portrait }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tomesAffiche, setTomeAffiche] = useState();

  // animation
  const leftValue = useRef(new Animated.Value(100)).current;

  const moveBack = () => {
    Animated.timing(leftValue, {
      toValue: 30,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

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
    (moveBack(),
    (
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
        <View style={{ alignSelf: "center", overflow: "hidden" }}>
          <Animated.View
            style={[
              {
                alignItems: "center",
                paddingVertical: 30,
                marginTop: 10,
                overflow: "hidden",

                transform: [{ translateY: leftValue }],
              },
            ]}>
            <Text style={styles.title}>à l'affiche</Text>
          </Animated.View>
        </View>

        <View style={styles.main}>
          <View style={styles.carousselContainer}>
            <ScrollView
              horizontal={true}
              style={styles.caroussel}
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

        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            color: "rgb(226, 218, 210)",
            fontSize: 30,
            textTransform: "uppercase",
            fontFamily: "casablanca",
          }}
        >
          à l'affiche
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.carousselContainer}>
          <ScrollView
            horizontal={true}
            style={styles.caroussel}
            showsHorizontalScrollIndicator={false}
          >
            {tomesAffiche &&
              tomesAffiche.map((tome, index) => {
                return (
                  <TouchableOpacity
                    style={styles.itemCaroussel}
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("AllStory", { tome: tome });
                    }}
                  >
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
      </SafeAreaView>
    ))
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
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
    marginTop: 20,
  },
  titleContainer: {
    alignItems: "center",
    paddingVertical: 30,
    marginTop: 10,
  },
  title: {
    color: "rgb(226, 218, 210)",
    fontSize: 20,
    textTransform: "uppercase",
  },
  carousselContainer: {
    height: height / 1.8,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  itemCaroussel: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: width,
  },
  viewImageCaroussel: {
    height: "75%",
    width: "100%",
  },
  imageCaroussel: {
    height: "100%",
    width: "100%",
  },
  carousselTitleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  titleCaroussel: {
    color: "rgb(226, 218, 210)",
    fontSize: 24,
    fontFamily: "casablanca",
  },
  subTitleCaroussel: {
    color: "rgb(226, 218, 210)",
    fontSize: 22,
    fontFamily: "casablanca",
  },
});
export default AfficheScreen;
