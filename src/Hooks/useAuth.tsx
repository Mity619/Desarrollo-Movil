import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    type User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/config";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // <-- nuevo
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);

            if (firebaseUser) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({ uid: firebaseUser.uid, email: firebaseUser.email })
                );
            } else {
                localStorage.removeItem("user");
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error: unknown) {
            if (error instanceof Error) console.error(error.message);
            else console.error("Error inesperado:", String(error));
            throw error; // <-- importante: relanzar para que el Login lo capture
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error: unknown) {
            if (error instanceof Error) console.error(error.message);
            else console.error("Error inesperado:", String(error));
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login");
        } catch (error: unknown) {
            if (error instanceof Error) console.error(error.message);
            else console.error("Error inesperado:", String(error));
            throw error;
        }
    };

    return { user, loading, login, logout, register };
}