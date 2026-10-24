import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Config/config";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", user.uid), {
      email,
      points: 0,
      missions: {},
      updatedAt: serverTimestamp(),
    });
  };

  const logout = async () => { await signOut(auth); };

  return { user, loading, login, register, logout };
}