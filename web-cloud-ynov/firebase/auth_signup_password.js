import { router } from "expo-router";
import "./firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth();

export const signup = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("userCredential : ", userCredential);
      const user = userCredential.user;
      sessionStorage.setItem("isLoggin", true);

      console.log("user : ", user);
      router.navigate("/user/:id", {
        user: user,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error for sign up : ", errorCode, errorMessage);
    });
};

export const signin = ({ email, password }) => {
  console.log("données : ", auth, email, password);
  // Problème de connexion
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      sessionStorage.setItem("userUID", user.uid);
      alert("Connexion réussie");
      sessionStorage.setItem("isLoggin", true);
      console.log("user : ", user);
      router.replace(`/${user.uid}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // successfullogin(false);
      console.log("error connexion");
      console.error(errorCode, errorMessage);
      alert("Connexion échouée");
      return error;
    });
};

export const signout = async () => {
  await auth.signOut();
  sessionStorage.clear();
  router.navigate("/login");
};

//update profil user
export const updateProfilUser = ({ datas }) => {
  updateProfile(auth.currentUser, {
    displayName: datas.displayName,
    photoURL: datas.photoURL,
  })
    .then((res) => {
      // Profile updated!
      console.log("Profile updated : ", res);
    })
    .catch((error) => {
      // An error occurred
      console.error("An error occurred : ", error);
    });
};

export const uploadTask = async (uri) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();
  const imageRef = ref(
    getStorage(),
    `images/${name}`
    //`images/${auth.currentUser.uid}/${new Date().toISOString()}`
  );
  const uploadTask = await uploadBytes(imageRef, blob);

  //return ref.put(blob);
  return uploadTask;
};

export const updateUserPhotoUrl = async (url) => {
  try {
    await updateProfile(auth.currentUser, { photoURL: url });
    return true;
  } catch (error) {
    console.error("Error updating user photo url", error);
    return false;
  }
};
