import { initializeApp } from "firebase/app";
import firestoreVar from "firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkpVGWMcPbmsGGC6OJ03FPKjPXIW43Sxc",
  authDomain: "uja-database.firebaseapp.com",
  projectId: "uja-database",
  storageBucket: "uja-database.appspot.com",
  messagingSenderId: "973507772035",
  appId: "1:973507772035:web:b54e2cb1e406880349e5b6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const nombre = 1;


export default {firebaseConfig}
