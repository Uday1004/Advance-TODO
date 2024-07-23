// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWwKNFd3ZRLINxy-Rwix8dXxHKgZ00-Zc",
  authDomain: "todo-list-2676e.firebaseapp.com",
  projectId: "todo-list-2676e",
  storageBucket: "todo-list-2676e.appspot.com",
  messagingSenderId: "479737642516",
  appId: "1:479737642516:web:88b03c89887e5b0d8cb101",
  measurementId: "G-097YXRBZ2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
 