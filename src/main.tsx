import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, Navigate } from "react-router-dom";

import {
    IonApp,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    setupIonicReact,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Route, Routes } from "react-router-dom";

import { logOutOutline } from "ionicons/icons";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import Loader from "./Loader";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import Login from "./Login";
import { isLoggedIn, logout } from "./auth";

setupIonicReact();

export interface Task {
    id: number;
    name: string;
    state: boolean;
}

const INITIAL_TASKS: Task[] = [
    { id: 4, name: "Challenge 4", state: false },
    { id: 3, name: "Challenge 3", state: true },
    { id: 2, name: "Challenge 2", state: true },
    { id: 1, name: "Challenge 1", state: true },
    { id: 0, name: "Estudiar Ionic", state: true },
];

const STORAGE_KEY = "tasks";

function Main() {
    const navigate = useNavigate();

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

    const handleLogout = useCallback(() => {
        logout();                          // limpia el token
        navigate("/login", { replace: true });
    }, [navigate]);

    // Ruta protegida: si no hay sesión, al login
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lista de tareas</IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={handleLogout}>
                            <IonIcon slot="start" icon={logOutOutline} />
                            Salir
                        </IonButton>
                    </IonButtons>
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
    );
}

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
).render(
    <React.StrictMode>
        <IonApp>
            <IonReactRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasks" element={<Main />} />
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={isLoggedIn() ? "/tasks" : "/login"}
                                replace
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </IonReactRouter>
        </IonApp>
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