import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../Config/db";

export const useDexie = (table: string) => {
    const [manualResults, setManualResults] = useState<any[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const results = useLiveQuery(() => db.table(table).toArray(), [table]) ?? [];

    const getAll = async () => {
        setIsPending(true);
        try {
            const data = await db.table(table).toArray();
            setManualResults(data);
            setIsPending(false);
        } catch (err: any) {
            setError(err.message);
            setIsPending(false);
        }
    };

    const add = async (data: any) => {
        setIsPending(true);
        try {
            await db.table(table).add({ ...data, createdAt: new Date().toISOString() });
            setIsPending(false);
        } catch (err: any) {
            setError(err.message);
            setIsPending(false);
        }
    };

    const remove = async (id: number) => {
        try {
            await db.table(table).delete(id);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { results, manualResults, isPending, error, getAll, add, remove };
};