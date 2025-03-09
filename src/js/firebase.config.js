// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJpKn0Xyld5cX64CtkXD1I9ObK6ekgWR0",
    authDomain: "to-do-list-7aea7.firebaseapp.com",
    projectId: "to-do-list-7aea7",
    storageBucket: "to-do-list-7aea7.firebasestorage.app",
    messagingSenderId: "37073439578",
    appId: "1:37073439578:web:71c3bd1030355c9c5d8163"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
