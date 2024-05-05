import { app } from "./firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export const createComment = async ({ comment, postID, createdBy }) => {
  try {
    const docRef = await addDoc(collection(db, "comment"), {
      comment: comment,
      postID: postID,
      date: new Date(),
      createdBy: createdBy,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
