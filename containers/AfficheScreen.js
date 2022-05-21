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
} from "react-native";

import Constants from "expo-constants";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import axios from "axios";

const AfficheScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tomesAffiche, setTomeAffiche] = useState();

  useEffect(() => {
    const getAffiche = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://extraordinaire-petit-theatre-w.herokuapp.com/tome/"
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
        <Button
          title="to AllStory"
          onPress={() => {
            navigation.navigate("AllStory");
          }}
        />
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
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>à l'affiche</Text>
        </View>

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
                console.log(tome);

                return (
                  <TouchableOpacity
                    style={styles.itemCaroussel}
                    key={index}
                    activeOpacity={0.7}>
                    <View style={styles.viewImageCaroussel}>
                      <Image
                        style={styles.imageCaroussel}
                        source={{ uri: tome.image }}
                        // resizeMode={"cover"}
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
            <AntDesign style={styles.iconeEllipse} name="scan1" size={30} />
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    // alignItems: "center",
    // borderColor: "yellow",
    // borderWidth: 2,
    marginTop: 30,
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
    height: "60%",
    marginTop: 30,
  },
  itemCaroussel: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 80,
  },
  viewImageCaroussel: {
    height: "80%",
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
  },
  subTitleCaroussel: {
    color: "rgb(226, 218, 210)",
    fontSize: 22,
  },
  containerEllipse: {
    alignItems: "center",
    height: "5%",
    marginTop: "20%",
  },
  ellipse: {
    backgroundColor: "rgb(226, 218, 210)",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    borderRadius: 100,
    width: "30%",
  },
  iconeEllipse: {
    color: "blue",
    height: 70,
  },
});
export default AfficheScreen;
