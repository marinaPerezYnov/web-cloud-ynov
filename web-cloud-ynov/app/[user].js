/* EXPO */
import { useLocalSearchParams } from "expo-router";

/* REACT */
import { Button, Text, TextInput, View } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
/* COMPONENTS */
import { getAuth } from "firebase/auth";
import {
  updateProfilUser,
  updateUserPhotoUrl,
} from "../firebase/auth_signup_password";
import { useEffect, useState } from "react";
import { uploadToFirebase } from "../firebase/storage_upload_file";

export default function User() {
  const auth = getAuth();
  const [user, setUser] = useState(auth?.currentUser);
  //const user = auth?.currentUser;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState(null);

  if (user !== null) {
    useEffect(() => {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhotoURL(user.photoURL);
    }, [user]);

    const emailVerified = user.emailVerified;
    const uid = user.uid;
    user.providerData.forEach((profile) => {
      // console.log("Sign-in provider: " + profile.providerId);
      //   console.log("  Provider-specific UID: " + profile.uid);
      //   console.log("  Name: " + profile.displayName);
      //   console.log("  Email: " + profile.email);
      console.log("Photo URL: " + profile.photoURL);
    });

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        console.log("picture to upload : ", result.assets[0].uri);
        setPhotoURL(result.assets[0].uri);

        const { uri } = result.assets[0];
        const filename = uri.split("/").pop();
        const uploadResp = await uploadToFirebase(uri, filename);
        let res = await updateUserPhotoUrl(uploadResp);

        if (res) {
          setUser({ ...user, photoURL: uploadResp });
        } else {
          console.log("Error updating photo URL");
        }
      }
    };

    const styles = {
      label: {
        margin: "2% auto !important",
        display: "block",
      },
      input: {
        color: "black",
        padding: "2%",
        backgroundColor: "bisque",
        border: "1px solid",
        width: "90%",
        margin: "2% auto",
      },
      image: {
        width: 200,
        height: 200,
      },
    };
    return (
      <>
        <Text>Profile :</Text>
        <Image source={{ uri: photoURL }} />
        <View>
          <Text style={styles.label}>Display Name</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter new display name"
            style={styles.input}
          />
          <Text style={styles.label}>Photo URL</Text>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {photoURL && (
            <Image source={{ uri: photoURL }} style={styles.image} />
          )}
          <Button
            onPress={pickImage}
            title="Update Profile"
            accessibilityLabel="Update Profile"
          />
        </View>
      </>
    );
  }
}
