import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Input from "./Input";
import { useState } from "react";

import axios from "axios";

const LoginForm = ({ setLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    if (email && password) {
      try {
        // console.log("avant resposne");
        const response = await axios.post(
          "https://backoffice-forest-admin-sr.herokuapp.com/user/login",
          {
            email,
            password,
          }
        );
        // console.log("apres response");
        console.log(response.data);
        setUser(response.data.token);
      } catch (error) {
        // console.log(error.response.data);
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
      <Input placeholder="Adresse e-mail" value={email} setState={setEmail} />
      <Input
        placeholder="Mot de passe"
        value={password}
        setState={setPassword}
        eye={true}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          handleSubmit();
        }}>
        <Text style={styles.textBtn}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLogin((prevState) => !prevState);
        }}>
        <Text style={styles.text}>
          Vous n'avez pas encore de compte ? Inscrivez-vous !
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
    paddingTop: 40,
    width: "100%",
  },
  loginBtn: {
    paddingVertical: 6,
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgb(226, 218, 210)",
    marginTop: 200,
  },
  textBtn: {
    color: "rgb(226, 218, 210)",
    fontSize: 14,
  },
  text: {
    fontSize: 12,
    color: "rgb(226, 218, 210)",
  },
});
export default LoginForm;
