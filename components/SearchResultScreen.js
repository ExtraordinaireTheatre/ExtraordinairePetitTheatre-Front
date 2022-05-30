import React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import axios from "axios";

import { MaterialIcons } from "@expo/vector-icons";

const SearchResult = ({
  title,
  navigation,
  setRecommandations,
  searchResults,
  setSearchResults,
  setShowSearchBar,
  tome,
  setSearchTitle,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResultTitle = async () => {
      setLoading(true);
      if (title) {
        try {
          const server_url = `https://backoffice-forest-admin-sr.herokuapp.com/books?title=${title}`;
          const response = await axios.get(server_url);
          setSearchResults(response.data);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setRecommandations();
      }
      setLoading(false);
    };
    fetchResultTitle();
  }, [title]);

  return (
    <View contentContainerStyle={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                width: "30%",
                paddingHorizontal: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={() => {
                setShowSearchBar(false);
                setSearchTitle("");
              }}>
              <Text
                style={{
                  fontFamily: "casablanca",
                  fontSize: 18,
                  color: "rgb(226, 218, 210)",
                }}>
                Retour
              </Text>
              <MaterialIcons
                name="navigate-next"
                size={24}
                color="rgb(226, 218, 210)"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{
              // flexGrow: 1,
              height: Dimensions.get("screen").height,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            {searchResults &&
              searchResults.map((result, index) => {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => {
                      // setShowSearchBar(false);
                      navigation.navigate("Story", {
                        bookData: result,
                        tome: tome,
                      });
                    }}>
                    <View style={styles.containerImageItemList}>
                      <Image
                        style={styles.imageItem}
                        source={{ uri: result.image }}
                      />
                    </View>
                    <View style={styles.itemListDescription}>
                      <Text
                        style={{
                          color: "rgb(165, 81, 69)",
                          fontFamily: "casablanca",
                          fontSize: 18,
                        }}
                        numberOfLines={2}>
                        {result.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
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
    height: "20%",
    width: "42%",
    // borderColor: "blue",
    // borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  containerImageItemList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    flex: 6,
  },
  imageItem: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flex: 2,
    width: "101%",
  },
});

export default SearchResult;
