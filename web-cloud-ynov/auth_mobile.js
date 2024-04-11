import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

const auth = getAuth(app);

export const signinWithMobile = async (phoneNumber) => {
  console.log("phoneNumber : ", phoneNumber);
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "normal",
      callback: (response) => {
        console.log("recaptcha allowed");
        console.log("response : ", response);
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        console.log("recaptcha not allowed");
        console.log("expired-callback");
      },
    }
  );
  const appVerifier = window.recaptchaVerifier;
  console.log("applicationVerifier : ", appVerifier);
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("Confirmation : ", confirmationResult);
      window.confirmationResult = confirmationResult;
      return confirmationResult;
    })
    .catch((error) => {
      console.error("error : ", error);
    });
};

export const verifyCode = async (code) => {
  if (!window.confirmationResult) {
    console.error("No confirmationResult");
    return false;
  }
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      console.log("result : ", result);
      // User signed in successfully.
      const user = result.user;
      console.log("user : ", user);
      return true;
      // ...
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.error("error : ", error);
      return false;
    });
};
