// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqeP_Eq4lREL1o5iGWEdED6Y3ioTUXXkY",
  authDomain: "web-cloud-ynov-6b7e7.firebaseapp.com",
  projectId: "web-cloud-ynov-6b7e7",
  storageBucket: "web-cloud-ynov-6b7e7.appspot.com",
  messagingSenderId: "512142276523",
  appId: "1:512142276523:web:7b4eb36e2ddcf1573c04ee",
  measurementId: "G-99EN6VZPR3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

console.log("app : ", app);
//const analytics = getAnalytics(app);
