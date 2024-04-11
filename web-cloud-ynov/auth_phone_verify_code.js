// This snippet file was generated by processing the source file:
// ./auth-next/phone-auth.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_phone_verify_code_modular]
const code = getCodeFromUserInput();
confirmationResult
  .confirm(code)
  .then((result) => {
    // User signed in successfully.
    const user = result.user;
    // ...
  })
  .catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
  });
// [END auth_phone_verify_code_modular]

var credential = firebase.auth.PhoneAuthProvider.credential(
  confirmationResult.verificationId,
  code
);

firebase.auth().signInWithCredential(credential);
