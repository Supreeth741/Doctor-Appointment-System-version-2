// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxL1BdzRq2InBMP5JWTAScdjZ6VfyO8T0",
  authDomain: "has-project-8c3e8.firebaseapp.com",
  projectId: "has-project-8c3e8",
  storageBucket: "has-project-8c3e8.appspot.com",
  messagingSenderId: "648058791600",
  appId: "1:648058791600:web:12a1cf76185aabd45afd75",
  measurementId: "G-8W7KHTTY69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;