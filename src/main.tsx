import React from "react";
import ReactDOM from "react-dom/client";
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./Context/AuthContext";
import { Login } from "./Pages/Login";
import { Tasks } from "./Pages/Tasks";
import { AvatarUpload } from "./Components/AvatarUpload";
import { listOutline, personOutline } from "ionicons/icons";

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

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return user ? <Navigate to="/tabs/tasks" replace /> : <>{children}</>;
}

function TabsLayout() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/tasks" element={<Tasks />} />
        <Route path="/tabs/profile" element={<AvatarUpload />} />
        <Route path="/tabs" element={<Navigate to="/tabs/tasks" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tasks" href="/tabs/tasks">
          <IonIcon icon={listOutline} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonRouterOutlet>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/tabs/*" element={<PrivateRoute><TabsLayout /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/tabs/tasks" replace />} />
            <Route path="*" element={<Navigate to="/tabs/tasks" replace />} />
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