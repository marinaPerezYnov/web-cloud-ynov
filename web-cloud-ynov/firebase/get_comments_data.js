//getComments
import { app } from "./firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

export const getComments = async () => {
  const comments = [];
  const querySnapshot = await getDocs(collection(db, "comment"));
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  return comments;
};
