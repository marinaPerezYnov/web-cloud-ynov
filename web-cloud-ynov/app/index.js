/* REACT */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import { getPosts } from "../firebase/get_posts_data";
import { getComments } from "../firebase/get_comments_data";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });

    getComments().then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Créer un nouveau post"
        color="#500c5e"
        accessibilityLabel="Créer un nouveau post"
        onPress={() => {
          return router.navigate("/addpost");
        }}
      />
      {posts.map((post) => {
        return (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <View key={post.id} style={styles.containerPostsAndComment}>
              <View style={styles.boxPost}>
                <Text style={styles.subtitle}>Post</Text>
                <Text>
                  <span style={styles.span}>Créé par :</span> {post.createdBy}
                </Text>
                <Text>
                  <span style={styles.span}>Titre : </span> <br />
                  {post.title}
                </Text>
                <Text>
                  <span style={styles.span}>Contenu :</span> <br />
                  {post.text}
                </Text>
              </View>
            </View>
          </Link>
        );
      })}
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
  box: {
    backgroundColor: "#e0b0ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  span: {
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: "15%",
    fontWeight: "bold",
    fontSize: "larger",
  },
  containerPostsAndComment: {
    border: "3px solid #128812",
    backgroundColor: "white",
    padding: "10%",
    margin: "5%",
  },
  subtitle: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: "5%",
    fontWeight: "bold",
    fontSize: "smaller",
  },
  boxPost: {
    border: "1px solid grey",
    padding: "10%",
    marginTop: "5%",
  },
});
