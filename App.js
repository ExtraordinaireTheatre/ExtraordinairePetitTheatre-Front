import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Import librairies navigation. Default Theme => stylyser toutes l'app avec une const Theme
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import composant Screen
import SettingsScreen from "./containers/SettingsScreen";
import AfficheScreen from "./containers/AfficheScreen";
import AllStoryScreen from "./containers/AllStorysScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AllStory" component={AllStoryScreen} />

        <Stack.Screen name="Affiche" component={AfficheScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
