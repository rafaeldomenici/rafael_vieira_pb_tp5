import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjaaundF5jLzJH3CQ-uAG2DoQq0-qaKLA",
  authDomain: "rafaelvieirapbtp5.firebaseapp.com",
  projectId: "rafaelvieirapbtp5",
  storageBucket: "rafaelvieirapbtp5.appspot.com",
  messagingSenderId: "956480344824",
  appId: "1:956480344824:web:fd63b3eacf722d6802610d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);