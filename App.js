import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Import librairies navigation. Default Theme => stylyser toutes l'app avec une const Theme
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import containers Screen
import SettingsScreen from "./containers/SettingsScreen";
import HomeScreen from "./containers/HomeScreen";
import StoryScreen from "./containers/StoryScreen";
import AfficheScreen from "./containers/AfficheScreen";
import AllStoryScreen from "./containers/AllStorysScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = async (token) => {
    token
      ? await AsyncStorage.setItem("userToken", token)
      : await AsyncStorage.removeItem("userToken");
    setUserToken(token);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      setUserToken(userToken);
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  if (isLoading === true) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!userToken ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Affiche" component={AfficheScreen} />
            <Stack.Screen name="AllStory" component={AllStoryScreen} />
            <Stack.Screen name="Story" component={StoryScreen} />
            <Stack.Screen name="Settings">
              {(props) => <SettingsScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
