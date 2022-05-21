import React from "react";
import {
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { MaterialIcons, Octicons } from "@expo/vector-icons";

const ListStory = ({ books, press, setPress }) => {
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
        <TouchableOpacity
          onPress={() => {
            setPress((prevState) => !prevState);
            console.log(press);
          }}>
          <MaterialIcons name="navigate-next" size={24} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View contentContainerStyle={{}}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
            paddingHorizontal: 10,
            height: 500,
          }}>
          {books.map((book, index) => {
            return (
              <TouchableOpacity
                style={styles.listItem}
                key={index}
                activeOpacity={0.7}>
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
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    width: "40%",
  },

  containerImageItemList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 5,
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
    marginTop: 0,
    paddingTop: 0,
  },

  icons: {
    color: "rgb(226, 218, 210)",
  },
});
export default ListStory;
