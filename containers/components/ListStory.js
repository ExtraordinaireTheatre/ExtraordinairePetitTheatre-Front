import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { MaterialIcons, Octicons } from "@expo/vector-icons";

const ListStory = () => {
  const tabFakeData = [1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.listContainer}>
      <View style={styles.listTitleContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <Octicons
            style={styles.icons}
            name="dot-fill"
            size={12}
            color="black"
          />
          <Text style={styles.listTitle}>Adaptés aux 1-3 ans</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="navigate-next" size={24} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View style={styles.liste}>
        {tabFakeData.map((item, index) => {
          console.log(item);
          return (
            <View style={styles.listItem} key={index}>
              <View style={styles.containerImageItemList}>
                <Image
                  style={styles.imageItemList}
                  source={require("../../assets/img/élément-4.png")}
                />
              </View>
              <View style={styles.itemListDescription}>
                <Text style={{ color: "rgb(165, 81, 69)" }}>
                  Aladdin et la Lampe Magique
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  liste: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  listTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  listTitle: {
    color: "rgb(226, 218, 210)",
    marginLeft: 20,
  },
  listItem: {
    marginTop: 10,
    marginHorizontal: 10,
    width: "42%",
  },
  imageListContainer: {
    height: "70%",
    width: "100%",
  },

  itemListDescription: {
    borderColor: "rgb(165, 81, 69)",
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
    backgroundColor: "rgb(226, 218, 210)",
  },
  imageItemList: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icons: {
    color: "rgb(226, 218, 210)",
  },
});
export default ListStory;
