import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";

import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";

import Input from "./Input";
const SignupForm = ({ setLogin, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasssword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    if (username && email && password && confirmPassword && newsletter) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://backoffice-forest-admin-sr.herokuapp.com/user/signup",
            {
              username,
              email,
              password,
              newsletter,
            }
          );
          // console.log(response.data);
          setUser(response.data.token);
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrorMessage("Vos mots de passe ne sont pas identiques");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
    setIsLoading(false);
  };
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      {errorMessage !== "" && <Text>{errorMessage}</Text>}
      <Input
        placeholder="Nom d'utilisateur"
        value={username}
        setState={setUsername}
      />
      <Input placeholder="Adresse e-mail" value={email} setState={setEmail} />
      <Input
        placeholder="Mot de passe"
        value={password}
        setState={setPassword}
        eye={true}
      />
      <Input
        placeholder="Confirmez votre mot de passe "
        value={confirmPassword}
        setState={setConfirmPasssword}
        eye={true}
      />

      <View style={styles.newsletterContainer}>
        <BouncyCheckbox
          onPress={() => setNewsletter(!newsletter)}
          style={{ paddingLeft: 5, fillColor: "rgb(226, 218, 210)" }}
        />
        <View style={styles.newsletter}>
          <Text style={styles.newsletterText}>
            Abonnez-vous à notre newsletter pour être informé de nos nouveautés
            et offres
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={async () => {
          handleSubmit();
        }}
        style={styles.signupBtn}>
        <Text style={styles.textBtn}>Créer le compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLogin((prevState) => !prevState);
        }}>
        <Text style={styles.text}>
          Vous avez déjà un compte ? Connectez-vous !
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 450,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
    width: "100%",
  },
  signupBtn: {
    paddingVertical: 6,
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgb(226, 218, 210)",
  },
  textBtn: {
    color: "rgb(226, 218, 210)",
    fontSize: 14,
  },
  text: {
    fontSize: 12,
    color: "rgb(226, 218, 210)",
  },
  newsletterContainer: {
    flexDirection: "row",
    width: "90%",
    // backgroundColor: "red",
  },
  newsletter: {
    // backgroundColor: "blue",
    width: "80%",
    alignItems: "flex-end",
  },
  newsletterText: {
    color: "rgb(226, 218, 210)",
    fontSize: 12,
    paddingLeft: 10,
  },
});
export default SignupForm;
