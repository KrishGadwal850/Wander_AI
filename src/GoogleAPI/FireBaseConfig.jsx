// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC26OW0EmPndKRZOo_GYIAjfqLAVoIDbpM",
  authDomain: "ai-trip-planner-1f6f0.firebaseapp.com",
  projectId: "ai-trip-planner-1f6f0",
  storageBucket: "ai-trip-planner-1f6f0.firebasestorage.app",
  messagingSenderId: "922753418147",
  appId: "1:922753418147:web:ca344d046ddc52485c5016",
  measurementId: "G-25B20BQSJS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
