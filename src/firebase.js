// Firebase Configuration & Initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD3iWmp-HTrQdhPoREgOWusKsIBZryYqx8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "logendiranr-portfolio.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "logendiranr-portfolio",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "logendiranr-portfolio.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "683768416376",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:683768416376:web:f4fecf7b83e08facac858d",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Auth Instance
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Always show account picker
});

// Sign in with Google Popup
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Sign Out
export const logOut = () => signOut(auth);

// Observe auth state changes
export const onAuthChanged = (callback) => onAuthStateChanged(auth, callback);

// ADMIN WHITELIST — Only this email can access /admin
export const ADMIN_EMAIL = "logendiranrv@gmail.com";

export default app;
