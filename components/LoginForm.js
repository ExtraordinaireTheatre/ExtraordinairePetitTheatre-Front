import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Input from "./Input";
import { useState } from "react";
const LoginForm = ({ setLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <View style={styles.container}>
      <Input placeholder="Adresse e-mail" value={email} setState={setEmail} />
      <Input
        placeholder="Mot de passe"
        value={password}
        setState={setPassword}
        eye={true}
      />
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.textBtn}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLogin((prevState) => !prevState);
        }}
      >
        <Text style={styles.text}>
          Vous n'avez pas encore de compte ? Inscrivez-vous !{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 350,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
    width: "100%",
  },
  loginBtn: {
    paddingVertical: 6,
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgb(226, 218, 210)",
    marginTop: 150,
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
