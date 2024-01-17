// Firebase.ts
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { API_KEY } from "./apiKey/apiKey.jsx";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "my-first-app-4f6fb.firebaseapp.com",
  projectId: "my-first-app-4f6fb",
  storageBucket: "my-first-app-4f6fb.appspot.com",
  messagingSenderId: "882395476061",
  appId: "1:882395476061:web:b1e1f32af273396651ddb4",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const addQuestRecord = async (location: {
  lat: number;
  lng: number;
}) => {
  try {
    const docRef = await addDoc(collection(db, "quests"), {
      Location: location,
      Timestamp: serverTimestamp(),
      Next: null,
    });

    console.log("Quest Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
