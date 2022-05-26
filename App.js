import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

//Import librairies navigation. Default Theme => stylyser toutes l'app avec une const Theme
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";

// Import containers Screen
import SettingsScreen from "./containers/SettingsScreen";
import HomeScreen from "./containers/HomeScreen";
import StoryScreen from "./containers/StoryScreen";
import AfficheScreen from "./containers/AfficheScreen";
import AllStoryScreen from "./containers/AllStorysScreen";
// import DisplayScreen from "./containers/DisplayScreen";
import CountDownScreen from "./containers/CountdownScreen";
import TestUser from "./containers/TestUser";
import TestAdmin from "./containers/TestAdmin";

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

  useEffect(() => {
    const colorBottomBar = async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setBackgroundColorAsync("rgb(165, 81, 69)");
      }
    };
    colorBottomBar();
  }, []);

  if (isLoading === true) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!userToken ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Affiche">
              {(props) => <AfficheScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="AllStory" component={AllStoryScreen} />
            <Stack.Screen name="Story" component={StoryScreen} />
            <Stack.Screen name="CountDown" component={CountDownScreen} />

            <Stack.Screen name="Settings">
              {(props) => <SettingsScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            {/* <Stack.Screen name="Display" component={DisplayScreen} /> */}
            <Stack.Screen name="TestUser" component={TestUser} />
            <Stack.Screen name="TestAdmin" component={TestAdmin} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
