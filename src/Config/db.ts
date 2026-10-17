import Dexie from "dexie";

export const db = new Dexie("MiAppDB");

db.version(1).stores({
    frutas: "++id, nombre, createdAt" // ++id autoincrementable
});