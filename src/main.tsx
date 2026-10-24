import React from "react";
import ReactDOM from "react-dom/client";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Navigate } from "react-router-dom";

// Importa tus páginas de sensores
import Home from "./Pages/Home";
import GeolocationPage from "./Pages/GeolocationPage";
import CameraPage from "./Pages/CameraPage";
import MotionPage from "./Pages/MotionPage";
import DevicePage from "./Pages/DevicePage";
import HapticsPage from "./Pages/HapticsPage";
import FilesystemPage from "./Pages/FilesystemPage";
import NotificationsPage from "./Pages/NotificationsPage";

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

function App() {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    {/* Ruta principal con los botones de sensores */}
                    <Route path="/home" element={<Home />} />
                    
                    {/* Rutas para cada sensor */}
                    <Route path="/sensors/geo" element={<GeolocationPage />} />
                    <Route path="/sensors/camera" element={<CameraPage />} />
                    <Route path="/sensors/motion" element={<MotionPage />} />
                    <Route path="/sensors/device" element={<DevicePage />} />
                    <Route path="/sensors/haptics" element={<HapticsPage />} />
                    <Route path="/sensors/filesystem" element={<FilesystemPage />} />
                    <Route path="/sensors/notifications" element={<NotificationsPage />} />

                    {/* Redirección por defecto */}
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);