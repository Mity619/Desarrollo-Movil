import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from "@ionic/react";
import { useHaptics } from "../Hooks/useHaptics";

export default function HapticsPage() {
  const { impact, notify, vibrate } = useHaptics();

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Haptics (Vibración)</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium">
          <p style={{ fontSize: "14px", marginBottom: "20px" }}>
            Prueba los diferentes tipos de vibración. En navegador puede no funcionar; usa un dispositivo físico.
          </p>
        </IonText>

        {/* Impactos */}
        <h3 style={{ fontSize: "15px", marginTop: "16px", fontWeight: 600 }}>Impacto</h3>
        <IonButton expand="block" color="primary" className="ion-margin-bottom" onClick={() => impact("light")}>
          Impacto suave (Light)
        </IonButton>
        <IonButton expand="block" color="primary" className="ion-margin-bottom" onClick={() => impact("medium")}>
          Impacto medio (Medium)
        </IonButton>
        <IonButton expand="block" color="primary" className="ion-margin-bottom" onClick={() => impact("heavy")}>
          Impacto fuerte (Heavy)
        </IonButton>

        {/* Notificaciones */}
        <h3 style={{ fontSize: "15px", marginTop: "24px", fontWeight: 600 }}>Notificación</h3>
        <IonButton expand="block" color="success" className="ion-margin-bottom" onClick={() => notify("success")}>
          Éxito
        </IonButton>
        <IonButton expand="block" color="warning" className="ion-margin-bottom" onClick={() => notify("warning")}>
          Advertencia
        </IonButton>
        <IonButton expand="block" color="danger" className="ion-margin-bottom" onClick={() => notify("error")}>
          Error
        </IonButton>

        {/* Vibrar */}
        <h3 style={{ fontSize: "15px", marginTop: "24px", fontWeight: 600 }}>Vibración libre</h3>
        <IonButton expand="block" fill="outline" color="medium" onClick={() => vibrate(200)}>
          Vibrar 200ms
        </IonButton>
        <IonButton expand="block" fill="outline" color="medium" className="ion-margin-top" onClick={() => vibrate(500)}>
          Vibrar 500ms
        </IonButton>
      </IonContent>
    </IonPage>
  );
}