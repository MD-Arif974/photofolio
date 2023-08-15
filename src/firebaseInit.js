import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUbdJxQL2n2wnDPk5cvI1JNosQq40A4KI",
  authDomain: "photofolio-3c3fc.firebaseapp.com",
  projectId: "photofolio-3c3fc",
  storageBucket: "photofolio-3c3fc.appspot.com",
  messagingSenderId: "390595834614",
  appId: "1:390595834614:web:048b7b4ca381019ed6f2d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

