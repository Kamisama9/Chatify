import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatify-64bf5.firebaseapp.com",
  projectId: "chatify-64bf5",
  storageBucket: "learn-firebase-260ab.appspot.com",
  messagingSenderId: "1091324122416",
  appId: "1:1091324122416:web:d3a54eef3311b22f5964f5"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
