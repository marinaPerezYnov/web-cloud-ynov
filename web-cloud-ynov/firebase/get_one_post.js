import { app } from "./firebaseConfig";
import { getFirestore, getDoc, doc, collection } from "firebase/firestore";
const db = getFirestore(app);

export const getOnePost = async (id) => {
  console.log(id);
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};
