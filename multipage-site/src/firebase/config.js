// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5RVWjtjqIEFo45atfipVDxYaQTDqW8_w",
  authDomain: "articledemo-1f9a2.firebaseapp.com",
  projectId: "articledemo-1f9a2",
  storageBucket: "articledemo-1f9a2.firebasestorage.app",
  messagingSenderId: "116177822448",
  appId: "1:116177822448:web:e4578252ada7ceb359d835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};