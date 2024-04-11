import { useEffect } from "react";

import firebase from "firebase/compat/app";
import "./firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const signup = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      console.log("Signup successfull!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

export const signin = ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Connexion réussie");
      // return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // successfullogin(false);
      console.log("error connexion");
      console.error(errorCode, errorMessage);
      alert("Connexion échouée");
      // return error;
    });
};
