/* REACT */
import React from "react";

/* EXPO */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

/* COMPONENTS */
import { signin, signup } from "./auth_signup_password";

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const [hasAccount, setHasAccount] = React.useState(false);
  return (
    <View style={styles.container}>
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
      {hasAccount ? (
        <View>
          <Button
            onPress={() => signup(email, password)}
            title="Sign Up"
            color="#841584"
            accessibilityLabel="Sign Up"
            style={{ marginBottom: 10 }}
          />
          <Button
            onPress={() => setHasAccount(true)}
            title="Already have an account?"
            color="#841584"
            accessibilityLabel="Already have an account?"
          />
        </View>
      ) : (
        <View>
          <Button
            onPress={() => signin(email, password)}
            title="Sign In"
            color="#841584"
            accessibilityLabel="Sign In"
            style={{ marginBottom: 10 }}
          />
          <Button
            onPress={() => setHasAccount(false)}
            title="Create Account"
            color="#841584"
            accessibilityLabel="Create Account"
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
