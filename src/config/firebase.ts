import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace this with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjxqdJEP_Pc4f84UF4JD4qKpVgfPIEJDo",
  authDomain: "optimal-login.firebaseapp.com",
  projectId: "optimal-login",
  storageBucket: "optimal-login.firebasestorage.app",
  messagingSenderId: "762977282958",
  appId: "1:762977282958:web:0c32c258c323846f0f52df",
  measurementId: "G-TTT7EJVBBC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Default credentials for easy login
const DEFAULT_EMAIL = 'ravipragash185@gmail.com';
const DEFAULT_PASSWORD = '123456789';

// Function to handle easy login with default credentials
export const easyLogin = (email, password) => {
  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    // Sign in with Firebase if the credentials match
    return signInWithEmailAndPassword(auth, DEFAULT_EMAIL, DEFAULT_PASSWORD)
      .then((userCredential) => {
        // Successfully signed in
        console.log("Logged in successfully:", userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        // Error during sign-in
        console.error("Login failed:", error.message);
        throw new Error("Invalid email or password");
      });
  } else {
    return Promise.reject(new Error("Invalid email or password"));
  }
};

export { auth, db };
