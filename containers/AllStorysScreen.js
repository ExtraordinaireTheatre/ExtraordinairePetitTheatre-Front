import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import Caroussel from "./components/Caroussel";
import ListStory from "./components/ListStory";

import Constants from "expo-constants";

import { Ionicons, Entypo, MaterialIcons, Octicons } from "@expo/vector-icons";

const AllStoryScreen = ({ navigation }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  console.log(showSearchBar);
  return (
    <View style={styles.container}>
      {showSearchBar ? (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <View style={styles.viewSearch}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Affiche");
              }}>
              <Entypo
                style={styles.icons}
                name="magnifying-glass"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TextInput
              style={styles.inputSearch}
              placeholder="Titre de l'oeuvre"
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                navigation.navigate("Affiche");
              }}>
              <Ionicons
                name="arrow-back-outline"
                size={16}
                color={"rgb(165, 81, 69)"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowSearchBar(!showSearchBar);
              }}>
              <View style={styles.buttonCircle}>
                <Entypo
                  style={styles.icons}
                  name="magnifying-glass"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.selected}
        activeOpacity={1}
        onPress={() => {
          setShowSearchBar(false);
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/img/élément-1.png")}
          />
        </View>

        <View style={styles.description}>
          <Text style={styles.textDescription}>Contes Classiques</Text>
          <Text style={styles.textDescription}>Tome 1</Text>
        </View>
      </TouchableOpacity>

      <ScrollView
        onStartShouldSetResponder={() => {
          setShowSearchBar(false);
        }}>
        {showSearchBar ? (
          <ListStory />
        ) : (
          <View style={{ height: "100%" }}>
            <Caroussel title="Adaptés aux 1-3 ans" />
            <Caroussel title="Adaptés aux 3-5 ans" />
            <Caroussel title="Adaptés aux 5-7 ans" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "rgb(165, 81, 69)",
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goBack: {
    backgroundColor: "rgb(226, 218, 210)",
    borderRadius: 50,
    padding: 15,
    color: "rgb(165, 81, 69)",
  },

  viewSearch: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(226, 218, 210,0.5)",
    width: "90%",
  },
  inputSearch: {
    marginLeft: 10,
  },
  buttonCircle: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(226, 218, 210, 0.5)",
  },
  icons: {
    color: "rgb(226, 218, 210)",
  },
  selected: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "rgb(226, 218, 210)",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    height: "20%",
    paddingBottom: 10,
  },

  imageContainer: {
    width: "25%",
    height: "100%",
    borderColor: "rgb(226, 218, 210)",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    justifyContent: "flex-end",
    width: "60%",
  },
  textDescription: {
    color: "rgb(226, 218, 210)",
    fontSize: 20,
    marginVertical: 5,
  },
});

export default AllStoryScreen;
