/* REACT */
import React, { useEffect, useState } from "react";
/* EXPO */
import { Link } from "expo-router";

import { Pressable, StyleSheet, View, Text } from "react-native";

import { signout } from "./../firebase/auth_signup_password";
export default function Header() {
  const [isLoggin, setIsLoggin] = useState(false);

  const headerStatusConnected = () => {
    return (
      <>
        <Link href="/">Home</Link>
        <Link href={`/${sessionStorage.getItem("userUID")}`}>Profile</Link>
        <Pressable onPress={signout}>
          <Text>SignOut</Text>
        </Pressable>
      </>
    );
  };
  const headerStatusNonConnected = () => {
    return (
      <>
        <Link href="/">Home</Link>
        <Link href="/login">SignIn</Link>
        <Link href="/signup">SignUP</Link>
      </>
    );
  };
  useEffect(() => {
    if (sessionStorage.getItem("isLoggin")) {
      setIsLoggin(true);
    } else {
      setIsLoggin(false);
    }
    // Modifier le visuel du header en fonction de la présence de l'userUID en sessionStorage
  }, [sessionStorage.getItem("userUID")]);

  return (
    <View style={styles.header}>
      {isLoggin ? headerStatusConnected() : headerStatusNonConnected()}
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
  header: {
    backgroundColor: "#b263ca",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "auto 5%",
  },
  box: {
    backgroundColor: "#e0b0ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
