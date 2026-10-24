import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonText, IonIcon, IonBackButton, IonButtons,
} from "@ionic/react";
import { cameraOutline, checkmarkCircle } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { useCamera } from "../Hooks/useCamera";
import { useMissions } from "../Context/MissionsContext";
import { useHaptics } from "../Hooks/useHaptics";
import { useLocalNotifications } from "../Hooks/useLocalNotifications";

export default function MissionPhoto() {
  const { photo, takePhoto } = useCamera();
  const { completeMission, isCompleted } = useMissions();
  const { notify } = useHaptics();
  const { sendNotification } = useLocalNotifications();
  const navigate = useNavigate();
  const completed = isCompleted(1);

  const handleComplete = async () => {
    if (!photo) return;
    await completeMission(1);
    await notify("success");
    await sendNotification("¡Misión completada!", "Has ganado 25 puntos por la foto");
    navigate("/tabs/missions");
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar>
        <IonButtons slot="start"><IonBackButton defaultHref="/tabs/missions" /></IonButtons>
        <IonTitle>Misión 1: Foto</IonTitle>
      </IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium"><p>Toma una foto para completar esta misión.</p></IonText>
        {completed && <IonText color="success"><p><IonIcon icon={checkmarkCircle} /> Ya completada</p></IonText>}

        <IonButton expand="block" onClick={takePhoto} disabled={completed}>
          <IonIcon slot="start" icon={cameraOutline} /> Tomar Foto
        </IonButton>

        {photo && <img src={photo} alt="Captura"
          style={{ width: "100%", borderRadius: 12, marginTop: 16 }} />}

        {photo && !completed && (
          <IonButton expand="block" color="success" className="ion-margin-top" onClick={handleComplete}>
            Guardar y completar misión
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
}