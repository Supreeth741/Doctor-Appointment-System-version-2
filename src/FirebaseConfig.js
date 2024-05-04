// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Your App Key",
  authDomain: "your Auth Domain",
  projectId: "Project ID",
  storageBucket: "storage",
  messagingSenderId: "messaging sender id",
  appId: "appid",
  measurementId: "measurement id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;