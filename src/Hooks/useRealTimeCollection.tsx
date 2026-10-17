import { useState, useEffect } from "react";
import { rtdb } from "../Config/config";
import { ref, push, onValue, remove as removeFromFirebase } from "firebase/database"; // ✅ renombrado

export const useRealTimeCollection = (table: string) => {
    const [results, setResults] = useState<any[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsPending(true);
        const dbRef = ref(rtdb, table);

        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = Object.entries(snapshot.val()).map(([id, value]: any) => ({
                        id,
                        ...value,
                    }));
                    setResults(data);
                } else {
                    setResults([]);
                }
                setIsPending(false);
            },
            (err) => {
                setError(err.message);
                setIsPending(false);
            }
        );

        return () => unsubscribe();
    }, [table]);

    const add = async (data: any) => {
        setIsPending(true);
        setError(null);
        try {
            const newRef = await push(ref(rtdb, table), {
                ...data,
                createdAt: new Date().toISOString(),
            });
            setIsPending(false);
            return newRef;
        } catch (err: any) {
            setError(err.message);
            setIsPending(false);
            return null;
        }
    };

    const remove = async (id: string) => {
        setIsPending(true);
        setError(null);
        try {
            await removeFromFirebase(ref(rtdb, `${table}/${id}`));
            setIsPending(false);
            return true;
        } catch (err: any) {
            setError(err.message);
            setIsPending(false);
            return false;
        }
    };

    return { results, isPending, error, add, remove };
};