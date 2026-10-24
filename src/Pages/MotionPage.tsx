import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from "@ionic/react";
import { useAccelerometer } from "../Hooks/useAccelerometer";

export default function MotionPage() {
  const { acceleration, magnitude, isShaking, isMoving } = useAccelerometer({ threshold: 18 });

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Acelerómetro</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <p>X: {acceleration.x.toFixed(2)}</p>
        <p>Y: {acceleration.y.toFixed(2)}</p>
        <p>Z: {acceleration.z.toFixed(2)}</p>
        <p>Magnitud: {magnitude.toFixed(2)}</p>
        <p>¿Hay movimiento?: {isMoving ? "Sí" : "No"}</p>
        {isShaking && <IonText color="warning"><h2>¡SHAKE DETECTADO!</h2></IonText>}
      </IonContent>
    </IonPage>
  );
}