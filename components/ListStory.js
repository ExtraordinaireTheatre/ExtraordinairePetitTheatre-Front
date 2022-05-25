import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { MaterialIcons, Octicons } from "@expo/vector-icons";

const ListStory = ({ setPress, booksAgeList, navigation }) => {
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
          <Text style={styles.listTitle}>
            Adaptés aux {booksAgeList[0].ageCategory} ans
          </Text>
        </View>
        <TouchableOpacity
          style={styles.toCarousselButton}
          onPress={() => {
            setPress((prevState) => !prevState);
          }}>
          <Text style={styles.toCarousselText}>Revenir</Text>
          <MaterialIcons name="navigate-next" size={24} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View contentContainerStyle={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
            paddingHorizontal: 10,
            height: 500,
            // borderColor: "yellow",
            // borderWidth: 5,
          }}>
          {booksAgeList.map((book, index) => {
            return (
              <TouchableOpacity
                style={styles.listItem}
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("Story", { bookData: book });
                }}>
                <View style={styles.containerImageItemList}>
                  <Image
                    style={styles.imageItem}
                    source={{ uri: book.image }}
                    resizeMode={"cover"}
                  />
                </View>
                <View style={styles.itemListDescription}>
                  <Text style={{ color: "rgb(165, 81, 69)" }} numberOfLines={1}>
                    {book.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  toCarousselButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  toCarousselText: {
    color: "rgb(226, 218, 210)",
  },
  listTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  listTitle: {
    color: "rgb(226, 218, 210)",
    marginLeft: 20,
  },
  listItem: {
    margin: 10,
    height: "33%",
    width: "44%",

    // borderColor: "blue",
    // borderWidth: 5,
  },

  containerImageItemList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 4,
    // borderColor: "red",
    // borderWidth: 5,
  },
  imageItem: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "110%",
    width: "100%",
  },

  itemListDescription: {
    borderColor: "rgb(165, 81, 69)",
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "rgb(226, 218, 210)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 3,
  },

  icons: {
    color: "rgb(226, 218, 210)",
  },
});
export default ListStory;
