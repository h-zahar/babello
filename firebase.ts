import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAnhYNqxWK6YSUwdc83nF0gvErj0Px_dhA",
  authDomain: "babelloai.firebaseapp.com",
  projectId: "babelloai",
  storageBucket: "babelloai.appspot.com",
  messagingSenderId: "337848768144",
  appId: "1:337848768144:web:9a1da667b65fb2deb6aa15",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
