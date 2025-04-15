// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWnXy6qZLcYEJESYnRYgGp-Lj1QkW-oYQ",
    authDomain: "auth-database-example-76c29.firebaseapp.com",
    projectId: "auth-database-example-76c29",
    storageBucket: "auth-database-example-76c29.firebasestorage.app",
    messagingSenderId: "811743268784",
    appId: "1:811743268784:web:827495fcb291b5d8709075",
    measurementId: "G-QC23HZN3Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//users
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// database
export const db = getFirestore(app);

