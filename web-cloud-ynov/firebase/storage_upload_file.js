import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = await uploadBytes(imageRef, theBlob);
  const downloadUrl = await getDownloadURL(uploadTask.ref);
  return downloadUrl;
};
