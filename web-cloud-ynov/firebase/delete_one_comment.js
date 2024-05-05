import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const deleteOneComment = async (id) => {
  try {
    await deleteDoc(doc(db, "comment", id));
    return true;
  } catch (e) {
    return false;
  }
};
