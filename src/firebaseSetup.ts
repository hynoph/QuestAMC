// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkPGhPBOIZT9tdK8bf9w5Z1FyFvZpBi4I",
  authDomain: "quest-989dd.firebaseapp.com",
  projectId: "quest-989dd",
  storageBucket: "quest-989dd.firebasestorage.app",
  messagingSenderId: "962377671317",
  appId: "1:962377671317:web:bbe66a1255df748ad5719c",
  measurementId: "G-4WP2PYTBQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);