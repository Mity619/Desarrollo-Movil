import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from "@ionic/react";
import { useGeolocation } from "../Hooks/useGeolocation";

export default function GeolocationPage() {
  const { position, error, getCurrentLocation, startTracking, stopTracking } = useGeolocation();

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Geolocalización</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>Obtener Ubicación Actual</IonButton>
        <IonButton expand="block" onClick={startTracking} color="success">Iniciar Seguimiento</IonButton>
        <IonButton expand="block" onClick={stopTracking} color="danger">Detener Seguimiento</IonButton>
        
        {position && (
          <div style={{ marginTop: '20px' }}>
            <p><strong>Latitud:</strong> {position.latitude}</p>
            <p><strong>Longitud:</strong> {position.longitude}</p>
          </div>
        )}
        {error && <IonText color="danger"><p>Error: {error}</p></IonText>}
      </IonContent>
    </IonPage>
  );
}