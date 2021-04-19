import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZF7fBezZciMMScpXVMRPLkQbb4u7Pl_Y",
  authDomain: "project4-ccfac.firebaseapp.com",
  projectId: "project4-ccfac",
  storageBucket: "project4-ccfac.appspot.com",
  messagingSenderId: "390621755414",
  appId: "1:390621755414:web:308417c54e95beb265dd37",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
