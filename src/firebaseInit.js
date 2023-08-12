import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTNr9tuMz2EjuWv5QSmtYOoqOUM970Kqo",
  authDomain: "myphotofolio-964c0.firebaseapp.com",
  projectId: "myphotofolio-964c0",
  storageBucket: "myphotofolio-964c0.appspot.com",
  messagingSenderId: "1062771557647",
  appId: "1:1062771557647:web:e9d9f964ee16158499aa7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

