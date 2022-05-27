import React from "react";

import { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  Animated,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Constants from "expo-constants";

import { Ionicons, Entypo } from "@expo/vector-icons";

const AnimationTest = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // state array books by ageCategory :
  const [dataBooksAge1, setDataBooksAge1] = useState(); // - 1-3 ans
  const [dataBooksAge3, setDataBooksAge3] = useState(); // - 3-5 ans
  const [dataBooksAge5, setDataBooksAge5] = useState(); // - 5-7 ans

  // data
  const [books, setBooks] = useState();

  // navigation
  // list / Age screen ListStory
  const [press, setPress] = useState(false);
  const [booksAgeList, setBooksAgeList] = useState();

  // search state
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;
  const animationShrink = useRef(new Animated.Value(0)).current;

  const growBar = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  const shrinkBar = () => {
    Animated.timing(animationShrink, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  const interpolateGrow = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["10%", "85%"],
  });

  const interpolateShrink = animationShrink.interpolate({
    inputRange: [0, 1],
    outputRange: ["85%", "10%"],
  });
  useEffect(() => {
    showSearchBar ? growBar() : shrinkBar();
  }, [showSearchBar]);
  return (
    <View style={styles.container}>
      {showSearchBar
        ? (growBar(), (<View></View>))
        : // <Animated.View
          //   style={[
          //     styles.box,
          //     showSearchBar
          //       ? { width: interpolateGrow }
          //       : { width: interpolateShrink },
          //   ]}>
          //   <View style={styles.viewSearch}>
          //     <TouchableOpacity
          //       onPress={() => {
          //         growBar();
          //       }}>
          //       <Entypo
          //         style={styles.icons}
          //         name="magnifying-glass"
          //         size={24}
          //         color="black"
          //       />
          //     </TouchableOpacity>
          //     <TextInput
          //       style={styles.inputSearch}
          //       placeholder="Titre de l'oeuvre"
          //       onChangeText={(v) => {
          //         setSearchTitle(v);
          //       }}
          //       placeholderTextColor={"rgb(226, 218, 210)"}
          //     />
          //   </View>
          // </Animated.View>
          (animation.setValue(0),
          animationShrink.setValue(0),
          (
            <View style={styles.containerModalOff}>
              {/* <View style={styles.header}>
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
              </View> */}
            </View>
          ))}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
          padding: 10,
        }}>
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
        <Animated.View
          style={[
            styles.box,
            showSearchBar
              ? { width: interpolateGrow }
              : { width: interpolateShrink },
          ]}>
          <View style={styles.viewSearch}>
            <TouchableOpacity
              onPress={() => {
                growBar();
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
      </View>
      <Button
        title="console"
        onPress={() => setShowSearchBar(!showSearchBar)}
      />
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
  },
  searchModal: {
    alignItems: "center",
    // marginVertical: 20,
  },
  box: {
    backgroundColor: "tomato",
    height: "100%",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "rgba(226, 218, 210,0.5)",
    borderRadius: 50,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
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

export default AnimationTest;
