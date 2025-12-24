import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";

// Firebase configuration from environment variables
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "test-9a041";
const appId = import.meta.env.VITE_FIREBASE_APP_ID || "1:00000000000:web:00000000000000";

// Extract messagingSenderId from appId (format: 1:SENDER_ID:web:...)
const messagingSenderId = appId.split(":")[1] || "00000000000";

const firebaseConfig = {
  apiKey: "AIzaSyBn_2EToCxy1ZGRLmvFSweryoKVGtzJLGM",
  authDomain: "test-9a041.firebaseapp.com",
  projectId: "test-9a041",
  storageBucket: "test-9a041.firebasestorage.app",
  messagingSenderId: "504697427854",
  appId: "1:504697427854:web:f51e60242c2ac836edf6df"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  return { user, loading, login, logout };
}
