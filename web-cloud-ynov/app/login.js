/* REACT */
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

/* COMPONENTS */
import { signin, signup } from "./../firebase/auth_signup_password";
import { signinWithMobile } from "./../firebase/auth_mobile";
import { signInWithGithub } from "./../firebase/auth_github_signin_popup";
import { verifyCode } from "./../firebase/auth_mobile";

export default function Login() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  //Regex pour email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  //Regex pour password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const [isAuthByPhone, setIsAuthByPhone] = React.useState(false);

  const [phoneNumber, onChangePhoneNumber] = React.useState("");

  const [isAuthByGithub, setIsAuthByGithub] = React.useState(false);

  const [code, setCode] = React.useState("");
  return (
    // <View style={styles.container}>
    <View>
      <View style={styles.box}>
        <Button
          onPress={() => {
            setIsAuthByPhone(false);
            setIsAuthByGithub(false);
          }}
          title="By email"
          color="default"
          margin="15px"
          accessibilityLabel="By email"
        />
        <Button
          onPress={() => {
            signInWithGithub();
          }}
          title="By Github"
          color="default"
          accessibilityLabel="By Github"
          style={{ margin: "15px" }}
        />
        <Button
          onPress={() => {
            setIsAuthByPhone(true);
            setIsAuthByGithub(false);
          }}
          title="By phone number"
          color="default"
          accessibilityLabel="By phone number"
          style={{ margin: "15px" }}
        />
      </View>
      {isAuthByPhone === false && isAuthByGithub === false ? (
        <View>
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
                // if (passwordRegex.test(password) && emailRegex.test(email)) {
                signin({ email, password });
                // } else {
                //   alert("Email or password not valid");
                // }
              }}
              title="Sign In"
              color="rgb(127 75 160)"
              accessibilityLabel="Sign In"
              style={{ marginBottom: 10 }}
            />
          </View>
        </View>
      ) : (
        <View>
          <div id="recaptcha-container"></div>
          <Text>By phone number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="Numéro de téléphone"
          ></TextInput>
          {/* Bouton pour s'authentifier par téléphone */}
          <Button
            onPress={() => {
              signinWithMobile(phoneNumber);
            }}
            title="Sign In"
            color="rgb(127 75 160)"
            accessibilityLabel="Sign In"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={setCode}
            value={code}
            placeholder="Code"
          ></TextInput>
          {/* Bouton pour vérifier le code */}
          <Button
            onPress={() => {
              verifyCode(code);
            }}
            title="Verify code"
            color="#841584"
            accessibilityLabel="Verify code"
            style={{ marginBottom: 10 }}
          />
        </View>
      )}
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
    color: "black",
    backgroundColor: "#e0b0ff",
    textAlign: "center",
  },
});
