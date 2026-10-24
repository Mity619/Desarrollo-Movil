import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from "@ionic/react";
import { useLocalNotifications } from "../Hooks/useLocalNotifications";

export default function NotificationsPage() {
  const { permission, requestPermission, sendNotification, scheduleNotification } = useLocalNotifications();

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Notificaciones Locales</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium">
          <p style={{ fontSize: "14px", marginBottom: "20px" }}>
            Solicita permisos y envía notificaciones locales. Funciona mejor en dispositivo físico.
          </p>
        </IonText>

        <IonText color={permission === "granted" ? "success" : "medium"}>
          <p style={{ fontSize: "13px", marginBottom: "16px" }}>
            <strong>Permiso actual:</strong> {permission ?? "No solicitado"}
          </p>
        </IonText>

        <IonButton expand="block" color="medium" onClick={requestPermission}>
          Solicitar Permisos
        </IonButton>

        <IonButton
          expand="block"
          color="primary"
          className="ion-margin-top"
          onClick={() => sendNotification("Hola 👋", "Notificación inmediata enviada")}
        >
          Enviar notificación ahora
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          color="secondary"
          className="ion-margin-top"
          onClick={() => scheduleNotification("Recordatorio", "Esta notificación llegó 5 segundos después", 5)}
        >
          Programar notificación (5s)
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          color="secondary"
          className="ion-margin-top"
          onClick={() => scheduleNotification("Recordatorio", "Esta notificación llegó 10 segundos después", 10)}
        >
          Programar notificación (10s)
        </IonButton>
      </IonContent>
    </IonPage>
  );
}