// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3t7TaqeqCoFWtoLeAajNseQK5PEszWTI",
  authDomain: "rk-food-cafe.firebaseapp.com",
  projectId: "rk-food-cafe",
  storageBucket: "rk-food-cafe.firebasestorage.app",
  messagingSenderId: "386867557207",
  appId: "1:386867557207:web:7bbf854c3411fb49ef4412"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
};
