import { useEffect } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonIcon, IonBadge, IonProgressBar, IonButton, IonText,
} from "@ionic/react";
import { cameraOutline, walkOutline, timerOutline, checkmarkCircle, lockClosed, chevronForward } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { useMissions } from "../Context/MissionsContext";
import { useAuth } from "../Context/AuthContext";
import { useLocalNotifications } from "../Hooks/useLocalNotifications";

const ICONS: Record<number, string> = { 1: cameraOutline, 2: walkOutline, 3: timerOutline };

export default function Home() {
  const { missions, progress, isCompleted, isUnlocked, completedCount, totalMissions, progressPercent } = useMissions();
  const { logout } = useAuth();
  const { requestPermission } = useLocalNotifications();
  const navigate = useNavigate();

  useEffect(() => { requestPermission(); }, []);

  return (
    <IonPage>
      <IonHeader><IonToolbar>
        <IonTitle>Misiones</IonTitle>
        <IonButton slot="end" fill="clear" color="danger" onClick={logout}>Salir</IonButton>
      </IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 42 }}>{progress.points} pts</h1>
          <IonText color="medium"><p>{completedCount}/{totalMissions} misiones completadas</p></IonText>
        </div>
        <IonProgressBar value={progressPercent / 100} color="success" />

        <IonList className="ion-margin-top">
          {missions.map((m) => {
            const done = isCompleted(m.id);
            const unlocked = isUnlocked(m.id);
            return (
              <IonItem key={m.id} button disabled={!unlocked}
                onClick={() => navigate(`/missions/${m.id}`)}>
                <IonIcon slot="start"
                  icon={done ? checkmarkCircle : unlocked ? ICONS[m.id] : lockClosed}
                  color={done ? "success" : unlocked ? "primary" : "medium"} />
                <IonLabel>
                  <h2>{m.title}</h2>
                  <p>{m.description}</p>
                </IonLabel>
                <IonBadge slot="end" color={done ? "success" : "primary"}>+{m.points}</IonBadge>
                {unlocked && !done && <IonIcon slot="end" icon={chevronForward} color="medium" />}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
}