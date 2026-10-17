import React from "react";
import ReactDOM from "react-dom/client";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Navigate } from "react-router-dom"; // v6

import { AuthProvider, AuthContext } from "./Context/useContext";
import { TasksProvider } from "./Context/TasksContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = React.useContext(AuthContext);
    return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <IonApp>
            <IonReactRouter>
                <AuthProvider>
                    <TasksProvider>
                        <IonRouterOutlet>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            {/* Redirección por defecto */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </IonRouterOutlet>
                    </TasksProvider>
                </AuthProvider>
            </IonReactRouter>
        </IonApp>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
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