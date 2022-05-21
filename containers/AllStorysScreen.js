import React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";

import Constants from "expo-constants";

// Import librairies : axios /
import axios from "axios";

// Import components : caroussel / list (quand modal recherche activée)
import Caroussel from "./components/Caroussel";
import ListStory from "./components/ListStory";

// Import icones
import { Ionicons, Entypo, MaterialIcons, Octicons } from "@expo/vector-icons";

const AllStoryScreen = ({ navigation }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState();

  // state array books by age :

  const [dataBooksAge1, setDataBooksAge1] = useState(); // - 1-3 ans
  const [dataBooksAge3, setDataBooksAge3] = useState(); // - 3-5 ans
  const [dataBooksAge5, setDataBooksAge5] = useState(); // - 5-7 ans

  useEffect(() => {
    // const getBooks = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await axios.get(
    //       "https://extraordinaire-petit-theatre-w.herokuapp.com/books/"
    //     );

    //     setData(response.data);

    //     const result = response.data;
    //     console.log(result);

    //     const arrayBookAge1 = [];
    //     const arrayBookAge3 = [];
    //     const arrayBookAge5 = [];

    //     result.map((book, index) => {
    //       if (book.ageCategory === "1-3") {
    //         arrayBookAge1.push(book);
    //       } else if (book.ageCategory === "3-5") {
    //         arrayBookAge3.push(book);
    //       } else {
    //         arrayBookAge5.push(book);
    //       }
    //     });

    //     setDataBooksAge1(arrayBookAge1);
    //     setDataBooksAge3(arrayBookAge3);
    //     setDataBooksAge5(arrayBookAge5);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    //   setIsLoading(false);
    // };
    getBooks();
  }, []);

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
              placeholderTextColor={"rgb(226, 218, 210)"}
            />
          </View>
        </View>
      ) : (
        <View style={styles.containerModalOff}>
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
          <ListStory booksAge1={dataBooksAge1} />
        ) : (
          <View style={styles.carousselView}>
            <Caroussel title="Adaptés aux 1-3 ans" booksAge1={dataBooksAge1} />
            <Caroussel title="Adaptés aux 5-7 ans" />
            <Caroussel title="Adaptés aux 1-3 ans" />
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
  containerModalOff: { paddingTop: 20 },
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
    marginTop: 20,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    height: "20%",
    paddingBottom: 10,
  },

  imageContainer: {
    width: "25%",
    height: "90%",
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
    height: "90%",
  },
  textDescription: {
    color: "rgb(226, 218, 210)",
    fontSize: 20,
    marginVertical: 5,
  },
  carousselView: {
    height: 700,
  },
});

export default AllStoryScreen;
