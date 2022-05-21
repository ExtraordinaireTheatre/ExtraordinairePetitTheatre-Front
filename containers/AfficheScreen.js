import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";

import Constants from "expo-constants";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const AfficheScreen = ({ navigation }) => {
  return (
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
            <TouchableOpacity style={styles.itemCaroussel}>
              <View style={styles.viewImageCaroussel}>
                <Image
                  style={styles.imageCaroussel}
                  source={require("../assets/img/élément-5.png")}
                  // resizeMode={"cover"}
                />
              </View>
              <View style={styles.carousselTitleContainer}>
                <Text style={styles.titleCaroussel}>A remplacer Par Lib</Text>
                <Text style={styles.subTitleCaroussel}>Tome 1</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.itemCaroussel}>
              <TouchableOpacity style={styles.viewImageCaroussel}>
                <Image
                  style={styles.imageCaroussel}
                  source={require("../assets/img/élément-1.png")}
                  // resizeMode={"cover"}
                />
              </TouchableOpacity>
              <View style={styles.carousselTitleContainer}>
                <Text style={styles.titleCaroussel}>A remplacer Par Lib</Text>
                <Text style={styles.subTitleCaroussel}>Tome 1</Text>
              </View>
            </View>

            <View style={styles.itemCaroussel}>
              <TouchableOpacity style={styles.viewImageCaroussel}>
                <Image
                  style={styles.imageCaroussel}
                  source={require("../assets/img/élément-4.png")}
                  // resizeMode={"cover"}
                />
              </TouchableOpacity>
              <View style={styles.carousselTitleContainer}>
                <Text style={styles.titleCaroussel}>A remplacer Par Lib</Text>
                <Text style={styles.subTitleCaroussel}>Tome 1</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.itemCaroussel}>
              <View style={styles.viewImageCaroussel}>
                <Image
                  style={styles.imageCaroussel}
                  source={require("../assets/img/élément-5.png")}
                  // resizeMode={"cover"}
                />
              </View>
              <View style={styles.carousselTitleContainer}>
                <Text style={styles.titleCaroussel}>A remplacer Par Lib</Text>
                <Text style={styles.subTitleCaroussel}>Tome 1</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.itemCaroussel}>
              <TouchableOpacity style={styles.viewImageCaroussel}>
                <Image
                  style={styles.imageCaroussel}
                  source={require("../assets/img/Aladdin-1.png")}
                  // resizeMode={"cover"}
                />
              </TouchableOpacity>
              <View style={styles.carousselTitleContainer}>
                <Text style={styles.titleCaroussel}>A remplacer par Lib</Text>
                <Text style={styles.subTitleCaroussel}>Tome 1</Text>
              </View>
            </View>
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
