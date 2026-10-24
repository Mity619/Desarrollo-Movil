import { useState, useEffect } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonText, IonIcon, IonBackButton, IonButtons,
} from "@ionic/react";
import { navigateOutline } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../Hooks/useGeolocation";
import { useMissions } from "../Context/MissionsContext";
import { useHaptics } from "../Hooks/useHaptics";
import { useLocalNotifications } from "../Hooks/useLocalNotifications";

const TARGET_METERS = 30;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MissionMovement() {
  const { position, error, getCurrentLocation, startTracking, stopTracking } = useGeolocation();
  const { completeMission, isCompleted } = useMissions();
  const { notify } = useHaptics();
  const { sendNotification } = useLocalNotifications();
  const navigate = useNavigate();
  const completed = isCompleted(2);

  const [startPos, setStartPos] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [reached, setReached] = useState(false);

  useEffect(() => {
    if (!position || !startPos || !tracking) return;
    const d = haversine(startPos.lat, startPos.lng, position.latitude, position.longitude);
    setDistance(d);
    if (d >= TARGET_METERS && !reached) { setReached(true); notify("success"); }
  }, [position, startPos, tracking, reached]);

  const handleStart = async () => {
    await getCurrentLocation();
  };

  // Cuando ya tenemos la primera posición, la tomamos como punto de partida
  useEffect(() => {
    if (position && !startPos && !tracking) {
      setStartPos({ lat: position.latitude, lng: position.longitude });
      startTracking();
      setTracking(true);
    }
  }, [position, startPos, tracking]);

  const handleComplete = async () => {
    await completeMission(2);
    await stopTracking();
    await sendNotification("¡Misión completada!", "Has ganado 35 puntos por moverte");
    navigate("/tabs/missions");
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar>
        <IonButtons slot="start"><IonBackButton defaultHref="/tabs/missions" /></IonButtons>
        <IonTitle>Misión 2: Movimiento</IonTitle>
      </IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium"><p>Muévete al menos {TARGET_METERS}m desde tu posición inicial.</p></IonText>
        {completed && <IonText color="success"><p>✅ Ya completada</p></IonText>}

        {!tracking ? (
          <IonButton expand="block" onClick={handleStart} disabled={completed}>
            <IonIcon slot="start" icon={navigateOutline} /> Iniciar seguimiento
          </IonButton>
        ) : (
          <>
            <h2>Distancia: {distance.toFixed(1)}m / {TARGET_METERS}m</h2>
            {reached && <IonText color="success"><h3>¡Objetivo alcanzado!</h3></IonText>}
            {reached && !completed && (
              <IonButton expand="block" color="success" onClick={handleComplete}>
                Completar misión (+35 pts)
              </IonButton>
            )}
          </>
        )}
        {error && <IonText color="danger"><p>Error: {error}</p></IonText>}
      </IonContent>
    </IonPage>
  );
}