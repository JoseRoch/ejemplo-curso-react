// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzWLEeGKy60JZKhpLQB5QD__EIjemYA0s",
  authDomain: "affliate-system.firebaseapp.com",
  projectId: "affliate-system",
  storageBucket: "affliate-system.firebasestorage.app",
  messagingSenderId: "953602206662",
  appId: "1:953602206662:web:939eebdc218b430adc60c7",
  measurementId: "G-5HXNS7JZ75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleauthprovider= new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

