import React from "react";
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

const Caroussel = ({ title }) => {
  return (
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
        <TouchableOpacity>
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
          alignItems: "flex-start",
        }}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.itemCaroussel}>
          <View style={styles.imageCarousselContainer}>
            <Image
              style={styles.imageItem}
              source={require("../../assets/img/élément-4.png")}
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
  );
};
const styles = StyleSheet.create({
  settingsIcon: {
    color: "rgb(226, 218, 210)",
  },
  containerCaroussel: {
    marginTop: 20,
  },
  titleCarousselContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  titleCaroussel: {
    color: "rgb(226, 218, 210)",
    marginLeft: 20,
  },
  caroussel: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "rgb(226, 218, 210)",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: "45%",
  },
  itemCaroussel: {
    width: "15%",
    height: "75%",
    marginHorizontal: 20,
    marginTop: 10,
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
    padding: 10,
    backgroundColor: "rgb(165, 81, 69)",
  },
});
export default Caroussel;
