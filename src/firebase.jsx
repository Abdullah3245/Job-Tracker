// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFkxqoSMalXMhjaSzMyQ4qdP8XSVIKXWA",
  authDomain: "job-tracker-9ece9.firebaseapp.com",
  projectId: "job-tracker-9ece9",
  storageBucket: "job-tracker-9ece9.firebasestorage.app",
  messagingSenderId: "913124980338",
  appId: "1:913124980338:web:15f6611efd5720f81b34eb",
  measurementId: "G-P5CNV1NRQF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);