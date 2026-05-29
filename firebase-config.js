import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWj7dozNpK8ExbJ4fptOODj66i09lxb0s",
  authDomain: "nexoracapitalcommunity.firebaseapp.com",
  projectId: "nexoracapitalcommunity",
  storageBucket: "nexoracapitalcommunity.firebasestorage.app",
  messagingSenderId: "714723891713",
  appId: "1:714723891713:web:76cf31f9eb0ad91ec7be00",
  measurementId: "G-C51DXRWY4W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
