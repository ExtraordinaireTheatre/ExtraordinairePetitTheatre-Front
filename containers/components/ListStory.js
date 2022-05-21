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

const ListStory = ({ booksAge1 }) => {
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
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          height: 150,
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: 10,
        }}>
        {booksAge1 &&
          booksAge1.map((book, index) => {
            console.log(book);
            return (
              <View style={styles.listItem} key={index}>
                <View style={styles.containerImageItemList}>
                  <Image
                    style={styles.imageItem}
                    source={{ uri: book.image }}
                  />
                </View>
                <View style={styles.itemListDescription}>
                  <Text style={{ color: "rgb(165, 81, 69)" }} numberOfLines={1}>
                    {book.title}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    height: 500,
  },
  liste: {},
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
    marginHorizontal: 10,
    // borderColor: "red",
    // borderWidth: 5,
    height: "100%",
    flex: 1,
  },

  containerImageItemList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 4,
  },
  imageItem: {
    height: "100%",
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
  },

  icons: {
    color: "rgb(226, 218, 210)",
  },
});
export default ListStory;
