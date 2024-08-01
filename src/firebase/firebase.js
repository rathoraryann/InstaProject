import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlmBT396zpGDhsEhFaRrh5ggqwEut70ZQ",
  authDomain: "instaclonebyaryan.firebaseapp.com",
  projectId: "instaclonebyaryan",
  storageBucket: "instaclonebyaryan.appspot.com",
  messagingSenderId: "1099108806247",
  appId: "1:1099108806247:web:cd0f8f185091831ce72ec2",
  measurementId: "G-WR52P60R5F"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, auth, firestore, storage}