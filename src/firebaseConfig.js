// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEUSQm6hgCIygkZSFtyVVU2nEpJ9dI2V8",
  authDomain: "my-blog-99957.firebaseapp.com",
  projectId: "my-blog-99957",
  storageBucket: "my-blog-99957.appspot.com",
  messagingSenderId: "661900004486",
  appId: "1:661900004486:web:207daa4559a3c287f59507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();