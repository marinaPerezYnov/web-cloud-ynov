/* REACT */
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

/* COMPONENTS */
import { signup } from "../firebase/auth_signup_password";

export default function Signup() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  //Regex pour email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  //Regex pour password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  return (
    <View>
      <View style={styles.box}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <View>
          <Button
            onPress={() => {
              if (emailRegex.test(email) && passwordRegex.test(password)) {
                signup({ email, password });
              } else {
                alert("Email or password not valid");
              }
            }}
            title="Sign Up"
            color="rgb(127 75 160)"
            accessibilityLabel="Sign Up"
            style={{ marginBottom: 10 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "normal",
    width: "20%",
    justifyContent: "space-evenly",
    margin: "auto",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  box: {
    backgroundColor: "#e0b0ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
