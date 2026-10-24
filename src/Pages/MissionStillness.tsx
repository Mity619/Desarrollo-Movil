import { useState, useEffect, useRef } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonText, IonIcon, IonBackButton, IonButtons,
} from "@ionic/react";
import { timerOutline } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { useAccelerometer } from "../Hooks/useAccelerometer";
import { useMissions } from "../Context/MissionsContext";
import { useHaptics } from "../Hooks/useHaptics";
import { useLocalNotifications } from "../Hooks/useLocalNotifications";

const REQUIRED_SECONDS = 10;
const STILL_THRESHOLD = 1.5;

export default function MissionStillness() {
  const { magnitude } = useAccelerometer({ threshold: 100 });
  const { completeMission, isCompleted } = useMissions();
  const { vibrate, notify } = useHaptics();
  const { sendNotification } = useLocalNotifications();
  const navigate = useNavigate();
  const completed = isCompleted(3);

  const [stillSeconds, setStillSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running || done) return;
    KeepAwake.keepAwake();
    const interval = setInterval(() => {
      if (magnitude < STILL_THRESHOLD) {
        if (startRef.current === null) startRef.current = Date.now();
        const elapsed = (Date.now() - startRef.current) / 1000;
        setStillSeconds(elapsed);
        if (elapsed >= REQUIRED_SECONDS) {
          setDone(true);
          setRunning(false);
          vibrate(1000);
          notify("success");
        }
      } else {
        startRef.current = null;
        setStillSeconds(0);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      KeepAwake.allowSleep();
    };
  }, [running, magnitude, done]);

  const handleComplete = async () => {
    await completeMission(3);
    await sendNotification("¡Misión completada!", "Has ganado 40 puntos por quedarte quieto");
    navigate("/tabs/missions");
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar>
        <IonButtons slot="start"><IonBackButton defaultHref="/tabs/missions" /></IonButtons>
        <IonTitle>Misión 3: Quieto</IonTitle>
      </IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium">
          <p>Quédate quieto 10 segundos. Si te mueves, el contador se reinicia.</p>
        </IonText>

        {!running && !done && !completed && (
          <IonButton expand="block" onClick={() => setRunning(true)}>
            <IonIcon slot="start" icon={timerOutline} /> Iniciar
          </IonButton>
        )}

        {running && (
          <>
            <h1 style={{ textAlign: "center", fontSize: 64 }}>{stillSeconds.toFixed(1)}s</h1>
            <IonText color={magnitude < STILL_THRESHOLD ? "success" : "warning"}>
              <p style={{ textAlign: "center" }}>
                {magnitude < STILL_THRESHOLD ? "Quieto ✓" : "¡No te muevas!"}
              </p>
            </IonText>
          </>
        )}

        {done && !completed && (
          <IonButton expand="block" color="success" onClick={handleComplete}>
            Completar misión (+40 pts)
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
}