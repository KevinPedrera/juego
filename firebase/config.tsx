
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfmSjgrBmKkVd_OirGB_Bf2JUtN3PVkBA",
  authDomain: "proyectofinal-b1934.firebaseapp.com",
  databaseURL: "https://proyectofinal-b1934-default-rtdb.firebaseio.com",
  projectId: "proyectofinal-b1934",
  storageBucket: "proyectofinal-b1934.firebasestorage.app",
  messagingSenderId: "896052592037",
  appId: "1:896052592037:web:d4f1ad8149a35bf89a3c4c",
  measurementId: "G-GZF3X67EL0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth( app )
export const db = getDatabase(app)