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
  Dimensions,
} from "react-native";

import { MaterialIcons, Octicons } from "@expo/vector-icons";

const Caroussel = ({
  dataBooksAge,
  title,
  setPress,
  setBooksAgeList,
  navigation,
}) => {
  return dataBooksAge ? (
    <View style={styles.containerCaroussel}>
      <View style={styles.titleCarousselContainer}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          onPress={() => {
            setPress((prevState) => !prevState);
            setBooksAgeList(dataBooksAge);
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Octicons
              style={styles.settingsIcon}
              name="dot-fill"
              size={12}
              color="black"
            />
            <Text style={styles.titleCaroussel}>{title}</Text>
          </View>

          <MaterialIcons
            name="navigate-next"
            size={24}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        style={styles.caroussel}
        contentContainerStyle={{
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}>
        {dataBooksAge.map((book, index) => {
          return (
            <TouchableOpacity
              style={styles.itemCaroussel}
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Story", { bookData: book });
              }}>
              <View style={styles.imageCarousselContainer}>
                <Image style={styles.imageItem} source={{ uri: book.image }} />
              </View>
              <View style={styles.itemDescription}>
                <Text style={{ color: "rgb(226, 218, 210)" }} numberOfLines={2}>
                  {book.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  settingsIcon: {
    color: "rgb(226, 218, 210)",
  },
  containerCaroussel: {
    marginTop: 20,
    height: "80%",
    flex: 1,
  },
  titleCarousselContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  titleCaroussel: {
    color: "rgb(226, 218, 210)",
    marginLeft: 20,
  },
  caroussel: {
    marginLeft: 15,
    backgroundColor: "rgb(226, 218, 210)",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: Dimensions.get("screen").height / 5.3,
  },
  itemCaroussel: {
    // flex: 1,
    width: Dimensions.get("screen").width / 2.5,
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "blue",
    // borderWidth: 5,
    marginHorizontal: 10,
  },
  imageCarousselContainer: {
    flex: 6,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  imageItem: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemDescription: {
    flex: 2,
    // height: "25%",
    width: "100%",
    borderColor: "rgb(226, 218, 210)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 3,
    backgroundColor: "rgb(165, 81, 69)",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Caroussel;
