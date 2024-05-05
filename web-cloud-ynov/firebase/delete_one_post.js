import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { getComments } from "./get_comments_data";
import { deleteOneComment } from "./delete_one_comment";

const db = getFirestore(app);

export const deleteOnePost = async (id) => {
  try {
    const comments = await getComments();
    comments.forEach(async (comment) => {
      if (comment.postID === id) {
        await deleteOneComment(comment.id);
        await deleteDoc(doc(db, "posts", id));
        return true;
      }
    });
  } catch (e) {
    return false;
  }
};
