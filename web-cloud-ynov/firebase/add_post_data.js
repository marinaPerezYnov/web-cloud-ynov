import { app } from "./firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export const createPost = async ({ title, text, createdBy }) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      text: text,
      date: new Date(),
      createdBy: createdBy,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
