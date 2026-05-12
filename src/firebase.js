import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvM8bf6FkFtwlCdK4dhXQi4pxenzss79U",
  authDomain: "website-portfolioku.firebaseapp.com",
  projectId: "website-portfolioku",
  storageBucket: "website-portfolioku.firebasestorage.app",
  messagingSenderId: "525953350802",
  appId: "1:525953350802:web:fba12287f22cdbe5b5fa4b",
  measurementId: "G-WM1G5YGDWW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };