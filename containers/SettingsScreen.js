import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";

// Import Constants package expo : fournit information sur appareil.
import Constants from "expo-constants";

// Import icones
import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  Fontisto,
  EvilIcons,
} from "@expo/vector-icons";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBack}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={"rgb(165, 81, 69)"}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Paramètres</Text>

        <TouchableOpacity>
          <Entypo
            style={styles.settingsIcon}
            name="login"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.settingsBlock}>
          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <FontAwesome5
                style={styles.settingsIcon}
                name="user-circle"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>
                Connexion / Créer un compte
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <MaterialIcons
                style={styles.settingsIcon}
                name="volume-up"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>
                Ajuster le volumes maximum
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <MaterialCommunityIcons
                style={styles.settingsIcon}
                name="content-save-outline"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Gérer les téléchargements</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsBlock}>
          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <FontAwesome
                style={styles.settingsIcon}
                name="star"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Evaluez-nous</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <Ionicons
                style={styles.settingsIcon}
                name="share-social"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Invitez un ami</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <AntDesign
                style={styles.settingsIcon}
                name="unlock"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>
                Entrez un code de référence
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsBlock}>
          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <Feather
                style={styles.settingsIcon}
                name="help-circle"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Assistance</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <Entypo
                style={styles.settingsIcon}
                name="email"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>
                Pour les mots d'amour... ou pas
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <MaterialIcons
                style={styles.settingsIcon}
                name="settings"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Paramètre du compte</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <View style={styles.lineSettings}>
              <MaterialCommunityIcons
                style={styles.settingsIcon}
                name="scale-balance"
                size={24}
                color="black"
              />
              <Text style={styles.settingsText}>Légal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.resauContainer}>
        <TouchableOpacity style={styles.buttonCircle}>
          <Fontisto style={styles.settingsIcon} name="instagram" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCircle}>
          <EvilIcons style={styles.settingsIcon} name="sc-facebook" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "rgb(165, 81, 69)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  goBack: {
    backgroundColor: "rgb(226, 218, 210)",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    color: "rgb(165, 81, 69)",
    borderWidth: 0,
  },
  title: {
    textTransform: "uppercase",
    color: "rgb(226, 218, 210)",
  },
  main: {
    marginTop: "-20%",
    paddingHorizontal: 10,
    // justifyContent: "space-between",
  },
  settingsBlock: {
    marginTop: 20,
  },
  settingsButton: {
    marginTop: 15,
  },
  lineSettings: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsText: {
    fontSize: 17,
    marginLeft: 15,
    color: "rgb(226, 218, 210)",
  },
  settingsIcon: {
    color: "rgb(226, 218, 210)",
  },
  resauContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    width: "40%",
    justifyContent: "space-around",
  },
  buttonCircle: {
    borderColor: "rgb(226, 218, 210)",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
});

export default SettingsScreen;
