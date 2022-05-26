import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";

import Constants from "expo-constants";

// Import librairies : axios /
import axios from "axios";

// Import components : caroussel / list (quand modal recherche activée)
import Caroussel from "../components/Caroussel";
import ListStory from "../components/ListStory";
import SearchResult from "../components/SearchResultScreen";

// Import icones
import { Ionicons, Entypo } from "@expo/vector-icons";

const AllStoryScreen = ({ navigation, route }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // state array books by ageCategory :
  const [dataBooksAge1, setDataBooksAge1] = useState(); // - 1-3 ans
  const [dataBooksAge3, setDataBooksAge3] = useState(); // - 3-5 ans
  const [dataBooksAge5, setDataBooksAge5] = useState(); // - 5-7 ans

  // data
  const [books, setBooks] = useState();
  const { tome } = route.params;

  // navigation
  // list / Age screen ListStory
  const [press, setPress] = useState(false);
  const [booksAgeList, setBooksAgeList] = useState();

  // search state
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // animation

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const responseBooks = await axios.get(
          `https://backoffice-forest-admin-sr.herokuapp.com/books/`
        );

        const resultBooks = responseBooks.data;
        setBooks(resultBooks);

        const arrayAge1 = [];
        const arrayAge3 = [];
        const arrayAge5 = [];

        resultBooks.map((item) => {
          if (item.ageCategory === "1-3") {
            arrayAge1.push(item);
          } else if (item.ageCategory === "3-5") {
            arrayAge3.push(item);
          } else {
            arrayAge5.push(item);
          }

          setDataBooksAge1(arrayAge1);
          setDataBooksAge3(arrayAge3);
          setDataBooksAge5(arrayAge5);
        });
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, [fadeAnim]);

  return isLoading ? (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(165, 81, 69)",
      }}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View style={styles.container}>
      {showSearchBar ? (
        <Animated.View
          style={{
            alignItems: "center",
            marginVertical: 20,
            position: "relative",
            opacity: fadeAnim,
          }}>
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
              onChangeText={(v) => {
                setSearchTitle(v);
              }}
              placeholderTextColor={"rgb(226, 218, 210)"}
            />
          </View>
        </Animated.View>
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

      {route.params && !searchTitle && (
        <TouchableOpacity
          style={styles.selected}
          activeOpacity={1}
          onPress={() => {
            setShowSearchBar(false);
            setSearchTitle("");
          }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: tome.image }}
              resizeMode="contain"
            />
          </View>

          <View style={styles.description}>
            <Text style={styles.textDescription}>{tome.title}</Text>
            <Text style={styles.textDescription}>Tome : {tome.tome}</Text>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView
        onStartShouldSetResponder={() => {
          setShowSearchBar(false);
        }}
        contentContainerStyle={{ flexGrow: 1 }}>
        {searchTitle ? (
          <View style={styles.carousselView}>
            <SearchResult
              title={searchTitle}
              navigation={navigation}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </View>
        ) : (
          dataBooksAge1 &&
          dataBooksAge3 &&
          dataBooksAge5 &&
          (press ? (
            <View>
              <ListStory
                setPress={setPress}
                booksAgeList={booksAgeList}
                navigation={navigation}
              />
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Caroussel
                setPress={setPress}
                title="Adaptés aux 1-3 ans"
                dataBooksAge={dataBooksAge1}
                setBooksAgeList={setBooksAgeList}
                navigation={navigation}
              />
              <Caroussel
                setPress={setPress}
                title="Adaptés aux 3-5 ans"
                dataBooksAge={dataBooksAge3}
                booksAgeList={booksAgeList}
                setBooksAgeList={setBooksAgeList}
                navigation={navigation}
              />
              <Caroussel
                setPress={setPress}
                title="Adaptés aux 5-7 ans"
                dataBooksAge={dataBooksAge5}
                booksAgeList={booksAgeList}
                setBooksAgeList={setBooksAgeList}
                navigation={navigation}
              />
            </ScrollView>
          ))
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
    color: "rgb(226, 218, 210)",
  },
  recommandationsContainer: {
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "rgb(226, 218, 210)",
    width: "80%",
    borderRadius: 10,
  },
  recommandationsBlock: {
    borderBottomColor: "rgb(165, 81, 69)",
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    padding: 5,
  },
  recommandationsText: {
    color: "rgb(165, 81, 69)",
    fontWeight: "700",
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
    height: "15%",
    // width: Dimensions.get("screen").width - Dimensions.get("screen").width / 4,
    paddingBottom: 10,
  },

  imageContainer: {
    width: "25%",
    height: "90%",
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
    // borderColor: "blue",
    // borderWidth: 2,
  },
});

export default AllStoryScreen;
