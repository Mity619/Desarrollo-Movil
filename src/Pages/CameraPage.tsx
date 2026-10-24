import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { useCamera } from "../Hooks/useCamera";

export default function CameraPage() {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Cámara</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto}>Tomar Foto</IonButton>
        {photo && <img src={photo} alt="Captura" style={{ marginTop: '20px', borderRadius: '8px' }} />}
      </IonContent>
    </IonPage>
  );
}