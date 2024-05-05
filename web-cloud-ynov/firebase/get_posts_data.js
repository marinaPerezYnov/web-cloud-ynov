import { app } from "./firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

export const getPosts = async () => {
  const posts = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
};
