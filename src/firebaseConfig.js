// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyApdiROCzRGbD_wllEhIh6Ac4-EDykVuVE",
//   authDomain: "gita-verse-translation.firebaseapp.com",
//   projectId: "gita-verse-translation",
//   storageBucket: "gita-verse-translation.firebasestorage.app",
//   messagingSenderId: "831795528525",
//   appId: "1:831795528525:web:b971fdb15e4746c0246d04",
//   measurementId: "G-Y4SYT25FBL",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyDbTczUd9WNv33M0gKnwgnshxwPPGN_oaY",
//   authDomain: "bhagavad-gita-corpus.firebaseapp.com",
//   projectId: "bhagavad-gita-corpus",
//   storageBucket: "bhagavad-gita-corpus.firebasestorage.app",
//   messagingSenderId: "153807783243",
//   appId: "1:153807783243:web:837369b365df940cd154ce",
//   measurementId: "G-24SXGCXH2T",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDbpGbtAShapMd-aJq2sqqSe5n8Y2ol8rA",
  authDomain: "bhagavad-gita-5fad1.firebaseapp.com",
  projectId: "bhagavad-gita-5fad1",
  storageBucket: "bhagavad-gita-5fad1.firebasestorage.app",
  messagingSenderId: "668254655596",
  appId: "1:668254655596:web:18361f12a2a39ab7383449",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
