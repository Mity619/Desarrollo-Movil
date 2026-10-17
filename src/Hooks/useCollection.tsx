import { useState } from "react";
import { db } from "../Config/config";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export const useCollection = (table: string) => {
    const [results, setResults] = useState<any[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAll = async (filters: any[] = []) => {

        setIsPending(true);
        setError(null);

        try {
            
            let q = query(collection(db, table));
            for (const [field, op, value] of filters) {
                q = query(q, where(field, op, value));
            }

            const snapshot = await getDocs(q);
            const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

            setResults(docs);
            setIsPending(false);

            return docs;
        } catch (err: any) {

            setError(err.message);
            setIsPending(false);

            return [];
        }
    };

    const add = async (data: any) => {

        setIsPending(true);

        try {

            const ref = await addDoc(collection(db, table), { ...data, createdAt: serverTimestamp() });
            setIsPending(false);

            return ref;

        } catch (err: any) {

            setError(err.message);
            setIsPending(false);

            return null;
        }
    };

    const update = async (id: string, data: any) => {

        setIsPending(true);

        try {

            await updateDoc(doc(db, table, id), { ...data, updatedAt: serverTimestamp() });
            setIsPending(false);

        } catch (err: any) {

            setError(err.message);
            setIsPending(false);

        }
    };

    const remove = async (id: string) => {

        setIsPending(true);

        try {
            
            await deleteDoc(doc(db, table, id));
            setIsPending(false);

        } catch (err: any) {

            setError(err.message);
            setIsPending(false);

        }
    };

    return { results, isPending, error, getAll, add, update, remove };
};