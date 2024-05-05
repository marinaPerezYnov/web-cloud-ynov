//import { getAuth } from "firebase/auth";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import { getComments } from "../../firebase/get_comments_data";
import { createComment } from "../../firebase/add_comment_data";
import { getOnePost } from "../../firebase/get_one_post";

import { StyleSheet } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { Button, TextInput } from "react-native";
import { deleteOneComment } from "../../firebase/delete_one_comment";
import { deleteOnePost } from "../../firebase/delete_one_post";
export default function Post() {
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState(false);
  const [comment, onChangeComment] = useState("");
  const [comments, setComments] = useState([]);

  //récupérer le postID dans l'url
  const { postId } = useLocalSearchParams();

  useEffect(() => {
    getOnePost(postId).then((data) => {
      setPost(data);
    });

    getComments().then((data) => {
      setComments(data);
    });
  }, [postId, newComment]);

  return (
    <View style={styles.box}>
      <View key={postId} style={styles.containerPostsAndComment}>
        <View style={styles.boxPost}>
          <Text style={styles.subtitle}>Post</Text>
          <Text>
            <span style={styles.span}>Créé par :</span> {post?.createdBy}
          </Text>
          <Text>
            <span style={styles.span}>Titre : </span> <br />
            {post?.title}
          </Text>
          <Text>
            <span style={styles.span}>Contenu :</span> <br />
            {post?.text}
          </Text>
        </View>
        <View style={styles.boxComment}>
          {comments.map((comment) => {
            if (comment.postID === postId) {
              return (
                <View key={comment.id}>
                  <Text style={styles.subtitle}>Commentaire</Text>
                  <Text>
                    <span style={styles.span}>Créé par :</span> <br />
                    {comment.createdBy}
                  </Text>
                  <hr />
                  <Text>
                    <span style={styles.span}>Contenu :</span> <br />{" "}
                    {comment.comment}
                  </Text>
                  <Button
                    title="Supprimer le commentaire"
                    color="#500c5e"
                    accessibilityLabel="Supprimer le commentaire"
                    onPress={() => {
                      deleteOneComment(comment.id);
                    }}
                  />
                </View>
              );
            }
          })}
        </View>
        <Button
          title="Commenter"
          color="#500c5e"
          accessibilityLabel="Commenter"
          onPress={() => {
            setNewComment(true);
          }}
        />
        {newComment && (
          <View>
            <Text>Commentaire</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeComment}
              value={comment}
              placeholder="Commentaire"
            />
            <Button
              onPress={() => {
                createComment({
                  comment: comment,
                  postID: postId,
                  createdBy: sessionStorage.getItem("userUID"),
                });
              }}
              color="#500c5e"
              title="Ajouter un commentaire"
              accessibilityLabel="Ajouter un commentaire"
              style={{ marginBottom: 10 }}
            />
          </View>
        )}
        <Button
          title="Supprimer le post"
          color="#500c5e"
          accessibilityLabel="Supprimer le post"
          onPress={() => {
            deleteOnePost(postId);
          }}
        />
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
    marginTop: "5%",
    marginBottom: "5%",
    fontWeight: "bold",
    fontSize: "smaller",
  },
  boxPost: {
    border: "1px solid grey",
    padding: "10%",
    marginTop: "5%",
  },
  boxComment: {
    border: "1px solid grey",
    padding: "10%",
    marginBottom: "5%",
  },
});
