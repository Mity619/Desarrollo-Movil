import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";

import {
    IonApp,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    setupIonicReact,
} from "@ionic/react";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import Loader from "./Loader";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

setupIonicReact();

export interface Task {
    id: number;
    name: string;
    state: boolean;
}

const INITIAL_TASKS: Task[] = [
    { id: 3, name: "Challenge 3", state: false },
    { id: 2, name: "Challenge 2", state: true },
    { id: 1, name: "Challenge 1", state: true },
    { id: 0, name: "Estudiar Ionic", state: true }
];

const STORAGE_KEY = "tasks";

function Main() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const timer = setTimeout(() => {
            if (cancelled) return;

            const stored = localStorage.getItem(STORAGE_KEY);
            setTasks(stored ? JSON.parse(stored) : INITIAL_TASKS);
            setLoading(false);
        }, 2000);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks, loading]);

    const handleAdd = useCallback((name: string, state: boolean) => {
        setTasks((prev) => [
            ...prev,
            { id: Date.now(), name, state },
        ]);
    }, []);

    const handleDelete = useCallback((id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const handleToggle = useCallback((id: number) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, state: !t.state } : t))
        );
    }, []);

    return (
        <IonApp>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Lista de tareas</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    {loading ? (
                        <Loader message="Cargando tareas..." />
                    ) : (
                        <>
                            <AddTask onAdd={handleAdd} />
                            <TaskList
                                tasks={tasks}
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                            />
                        </>
                    )}
                </IonContent>
            </IonPage>
        </IonApp>
    );
}

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("Service Worker registrado"))
            .catch((err) => console.error("Error SW:", err));
    });
}