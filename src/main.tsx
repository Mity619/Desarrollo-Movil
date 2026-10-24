import React from "react";
import ReactDOM from "react-dom/client";
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Navigate } from "react-router-dom";
import { listOutline, trophyOutline, statsChartOutline } from "ionicons/icons";

import { AuthProvider, useAuth } from "./Context/AuthContext";
import { MissionsProvider } from "./Context/MissionsContext";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Ranking from "./Pages/Ranking";
import Results from "./Pages/Results";
import MissionPhoto from "./Pages/MissionPhoto";
import MissionMovement from "./Pages/MissionMovement";
import MissionStillness from "./Pages/MissionStillness";

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
  return user ? <Navigate to="/tabs/missions" replace /> : <>{children}</>;
}

function TabsLayout() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/missions" element={<Home />} />
        <Route path="/tabs/ranking" element={<Ranking />} />
        <Route path="/tabs/results" element={<Results />} />
        <Route path="/tabs" element={<Navigate to="/tabs/missions" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="missions" href="/tabs/missions">
          <IonIcon icon={listOutline} /><IonLabel>Misiones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ranking" href="/tabs/ranking">
          <IonIcon icon={trophyOutline} /><IonLabel>Ranking</IonLabel>
        </IonTabButton>
        <IonTabButton tab="results" href="/tabs/results">
          <IonIcon icon={statsChartOutline} /><IonLabel>Resultados</IonLabel>
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
          <MissionsProvider>
            <IonRouterOutlet>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/tabs/*" element={<PrivateRoute><TabsLayout /></PrivateRoute>} />
              <Route path="/missions/1" element={<PrivateRoute><MissionPhoto /></PrivateRoute>} />
              <Route path="/missions/2" element={<PrivateRoute><MissionMovement /></PrivateRoute>} />
              <Route path="/missions/3" element={<PrivateRoute><MissionStillness /></PrivateRoute>} />
              <Route path="/" element={<Navigate to="/tabs/missions" replace />} />
              <Route path="*" element={<Navigate to="/tabs/missions" replace />} />
            </IonRouterOutlet>
          </MissionsProvider>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode><App /></React.StrictMode>
);