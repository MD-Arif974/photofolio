import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCibyVAJi9Xjs9fybpMz9zuT7XhotsXns",
  authDomain: "photofolio-7169d.firebaseapp.com",
  projectId: "photofolio-7169d",
  storageBucket: "photofolio-7169d.appspot.com",
  messagingSenderId: "1000358739870",
  appId: "1:1000358739870:web:e3d84f717c12fddce8608f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

