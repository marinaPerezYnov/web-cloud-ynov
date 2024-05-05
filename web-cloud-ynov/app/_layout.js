import { Stack } from "expo-router";
import Header from "./../components/header";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Layout() {
  useEffect(() => {
    if (sessionStorage.getItem("isLoggin") === null) {
      router.navigate("/login");
    }
  }, [sessionStorage.length]);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <Stack />
      </View>
    </>
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
  box: {
    backgroundColor: "#e0b0ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
