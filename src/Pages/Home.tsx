import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { locationOutline, cameraOutline, phonePortraitOutline, batteryHalfOutline, fingerPrintOutline, folderOutline, notificationsOutline } from "ionicons/icons";

export default function Home() {
  const navigate = useNavigate();
  
  const sensors = [
    { name: "Geolocalización", path: "/sensors/geo", icon: locationOutline },
    { name: "Cámara", path: "/sensors/camera", icon: cameraOutline },
    { name: "Acelerómetro", path: "/sensors/motion", icon: phonePortraitOutline },
    { name: "Dispositivo", path: "/sensors/device", icon: batteryHalfOutline },
    { name: "Haptics (Vibración)", path: "/sensors/haptics", icon: fingerPrintOutline },
    { name: "Sistema de Archivos", path: "/sensors/filesystem", icon: folderOutline },
    { name: "Notificaciones Locales", path: "/sensors/notifications", icon: notificationsOutline },
  ];

  return (
    <IonPage>
      <IonHeader><IonToolbar color="primary"><IonTitle>Sensores Nativos</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {sensors.map((s) => (
            <IonItem button key={s.path} onClick={() => navigate(s.path)}>
              <IonIcon icon={s.icon} slot="start" color="primary" />
              <IonLabel>{s.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" onClick={() => navigate("/login")} className="ion-margin-top" color="medium">
          Cerrar Sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}