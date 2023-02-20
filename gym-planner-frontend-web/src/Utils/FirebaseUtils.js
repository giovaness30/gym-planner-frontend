// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8Fu0nerpIcr16j3zIhiNtSn9LGYBg7y4",
  authDomain: "gym-planner-backend.firebaseapp.com",
  databaseURL: "https://gym-planner-backend-default-rtdb.firebaseio.com",
  projectId: "gym-planner-backend",
  storageBucket: "gym-planner-backend.appspot.com",
  messagingSenderId: "84111928571",
  appId: "1:84111928571:web:97c589d50be7634fa5d45e",
  measurementId: "G-051E9JPDCH"
};

// Initialize Firebase
export const FireDataBase = initializeApp(firebaseConfig);
const analytics = getAnalytics(FireDataBase);


