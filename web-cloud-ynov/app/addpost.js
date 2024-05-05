import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { createPost } from "./../firebase/add_post_data";

export default function AddPost() {
  const [title, onChangeTitle] = useState("");
  const [text, onChangeText] = useState("");

  const styles = {
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  };

  return (
    <View>
      <Text>Add Post</Text>
      <label>Title</label>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Title"
      />
      <label>Content</label>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Content"
        multiline={true}
        numberOfLines={4}
      />
      <Button
        onPress={() => {
          createPost({
            title: title,
            text: text,
            createdBy: sessionStorage.getItem("userUID"),
          });
        }}
        title="Add Post"
        accessibilityLabel="Add Post"
        style={{ marginBottom: 10 }}
      />
    </View>
  );
}
