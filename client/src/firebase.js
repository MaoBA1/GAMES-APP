import  { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyDSFn84LLB6IdZtdiPWoQ-M7lunygNxgn8",
    authDomain: "games-app-7253e.firebaseapp.com",
    projectId: "games-app-7253e",
    storageBucket: "games-app-7253e.appspot.com",
    messagingSenderId: "714905322621",
    appId: "1:714905322621:web:6f048315a869a80dc9dd14"
  };



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);