import React from "react";
import ReactDOM from "react-dom/client";
import {
    IonApp,
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Navigate } from "react-router-dom";
import { peopleOutline, listOutline, nutritionOutline } from "ionicons/icons";

import { AuthProvider, AuthContext } from "./Context/useContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contacts from "./Pages/Contacts";
import Tasks from "./Pages/Task";
import Fruits from "./Pages/Fruits";

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

// Desregistrar Service Worker (evita conflicto con Firestore realtime)
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
            registration.unregister();
        }
    });
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return null;
    return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const Tabs = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route path="/app/contacts" element={<Contacts />} />
            <Route path="/app/tasks" element={<Tasks />} />
            <Route path="/app/fruits" element={<Fruits />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
            <IonTabButton tab="contacts" href="/app/contacts">
                <IonIcon icon={peopleOutline} />
                <IonLabel>Contactos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tasks" href="/app/tasks">
                <IonIcon icon={listOutline} />
                <IonLabel>Tareas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="fruits" href="/app/fruits">
                <IonIcon icon={nutritionOutline} />
                <IonLabel>Frutas</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

function App() {
    return (
        <IonApp>
            <IonReactRouter>
                <AuthProvider>
                    <IonRouterOutlet>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/app/*"
                            element={
                                <PrivateRoute>
                                    <Tabs />
                                </PrivateRoute>
                            }
                        />
                        {/* Redirección desde la raíz directamente a contacts */}
                        <Route path="/" element={<Navigate to="/app/contacts" replace />} />
                        <Route path="*" element={<Navigate to="/app/contacts" replace />} />
                    </IonRouterOutlet>
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