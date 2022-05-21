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
} from "react-native";

import Constants from "expo-constants";

import { Ionicons, Entypo, MaterialIcons, Octicons } from "@expo/vector-icons";

import axios from "axios";

const Caroussel = ({ dataBooksAge, title, press, setPress }) => {
  return dataBooksAge ? (
    <View style={styles.containerCaroussel}>
      <View style={styles.titleCarousselContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
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
        <TouchableOpacity
          onPress={() => {
            setPress((prevState) => !prevState);
            console.log;
          }}>
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
              activeOpacity={0.8}>
              <View style={styles.imageCarousselContainer}>
                <Image style={styles.imageItem} source={{ uri: book.image }} />
              </View>
              <View style={styles.itemDescription}>
                <Text style={{ color: "rgb(226, 218, 210)" }}>
                  {book.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.itemCaroussel}>
          <View style={styles.imageCarousselContainer}>
            <Image
              style={styles.imageItem}
              source={require("../../assets/img/élément-5.png")}
            />
          </View>
          <View style={styles.itemDescription}>
            <Text style={{ color: "rgb(226, 218, 210)" }}>
              Aladdin et la Lampe Magique
            </Text>
          </View>
        </View>
        <View style={styles.itemCaroussel}>
          <View style={styles.imageCarousselContainer}>
            <Image
              style={styles.imageItem}
              source={require("../../assets/img/élément-1.png")}
            />
          </View>
          <View style={styles.itemDescription}>
            <Text style={{ color: "rgb(226, 218, 210)" }}>
              Aladdin et la Lampe Magique
            </Text>
          </View>
        </View>
        <View style={styles.itemCaroussel}>
          <View style={styles.imageCarousselContainer}>
            <Image
              style={styles.imageItem}
              source={require("../../assets/img/Aladdin-1.png")}
            />
          </View>
          <View style={styles.itemDescription}>
            <Text style={{ color: "rgb(226, 218, 210)" }}>
              Aladdin et la Lampe Magique
            </Text>
          </View>
        </View>
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
    height: "30%",
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
    marginHorizontal: 20,
    backgroundColor: "rgb(226, 218, 210)",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  itemCaroussel: {
    width: "15%",
    height: "75%",
    marginHorizontal: 20,
  },
  imageCarousselContainer: {
    height: "70%",
    width: "100%",
  },
  imageItem: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemDescription: {
    borderColor: "rgb(226, 218, 210)",
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 5,
    backgroundColor: "rgb(165, 81, 69)",
  },
});
export default Caroussel;
