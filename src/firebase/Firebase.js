import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, getStream } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-4335b.firebaseapp.com",
  projectId: "react-chat-4335b",
  storageBucket: "learn-firebase-260ab.appspot.com",
  messagingSenderId: "865438259227",
  appId: "1:865438259227:web:d9d55f44437482ff18c0be",
  measurementId: "G-96XQ2M825Q"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage()