import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ setUser }) => {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require("../assets/titre.png")}
          resizeMode="contain"
        />
      </View>

      {!modal ? (
        <View style={styles.homeBlock}>
          <Text style={styles.homeText}>Votre première fois ?</Text>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => {
              setModal(true);
              setLogin(false);
            }}
          >
            <Text style={styles.textSignupBtn}>S'inscrire</Text>
          </TouchableOpacity>
          <Text style={styles.homeText}>J'ai mes habitudes !</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              setModal(true);
              setLogin(true);
            }}
          >
            <Text style={styles.textLoginBtn}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {login ? (
            <LoginForm setLogin={setLogin} setUser={setUser} />
          ) : (
            <SignupForm setLogin={setLogin} setUser={setUser} />
          )}
        </>
      )}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(165, 81, 69)",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    width: width,
    height: height,
  },
  header: {
    height: height / 2.5,
    width: "100%",
    justifyContent: "center",
  },
  img: {
    height: "80%",
    width: "100%",
  },
  homeBlock: {
    marginTop: height / 4,
    alignItems: "center",
    justifyContent: "center",
    height: height / 5,
  },
  homeText: {
    fontSize: 12,
    color: "rgb(226, 218, 210)",
    paddingVertical: 10,
  },
  signupBtn: {
    backgroundColor: "rgb(226, 218, 210)",
    paddingVertical: 8,
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
  },
  loginBtn: {
    paddingVertical: 8,
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgb(226, 218, 210)",
  },

  textSignupBtn: {
    color: "rgb(165, 81, 69)",
    fontSize: 14,
  },
  textLoginBtn: {
    color: "rgb(226, 218, 210)",
    fontSize: 14,
  },
});
export default HomeScreen;
