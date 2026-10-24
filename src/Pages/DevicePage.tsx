import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import { batteryHalfOutline, phonePortraitOutline, hardwareChipOutline, fingerPrintOutline, checkmarkCircle, closeCircle } from "ionicons/icons";
import { useDevice } from "../Hooks/useDevice";

export default function DevicePage() {
  const { battery, info, deviceId, loading } = useDevice();

  if (loading) {
    return (
      <IonPage>
        <IonHeader><IonToolbar><IonTitle>Dispositivo</IonTitle></IonToolbar></IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: "center", paddingTop: "40vh" }}>
            <IonSpinner name="crescent" />
            <p>Cargando información...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const batteryPercent = battery ? Math.round((battery.batteryLevel ?? 0) * 100) : 0;

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Dispositivo</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        {/* Batería */}
        <IonList>
          <IonItem>
            <IonIcon slot="start" icon={batteryHalfOutline} color="primary" />
            <IonLabel>
              <h2>Batería: {batteryPercent}%</h2>
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <IonIcon
                  icon={battery?.isCharging ? checkmarkCircle : closeCircle}
                  color={battery?.isCharging ? "success" : "medium"}
                />
                {battery?.isCharging ? "Cargando" : "No cargando"}
              </p>
            </IonLabel>
          </IonItem>

          {/* Modelo */}
          <IonItem>
            <IonIcon slot="start" icon={phonePortraitOutline} color="primary" />
            <IonLabel>
              <h2>Modelo</h2>
              <p>{info?.model ?? "Desconocido"}</p>
            </IonLabel>
          </IonItem>

          {/* Plataforma */}
          <IonItem>
            <IonIcon slot="start" icon={hardwareChipOutline} color="primary" />
            <IonLabel>
              <h2>Plataforma</h2>
              <p>{info?.platform ?? "Desconocida"}</p>
            </IonLabel>
          </IonItem>

          {/* Sistema Operativo */}
          <IonItem>
            <IonIcon slot="start" icon={hardwareChipOutline} color="primary" />
            <IonLabel>
              <h2>Sistema Operativo</h2>
              <p>{info?.operatingSystem ?? "Desconocido"} {info?.osVersion ?? ""}</p>
            </IonLabel>
          </IonItem>

          {/* ID del dispositivo */}
          <IonItem>
            <IonIcon slot="start" icon={fingerPrintOutline} color="primary" />
            <IonLabel className="ion-text-wrap">
              <h2>ID del dispositivo</h2>
              <IonText color="medium">
                <p style={{ fontSize: "12px", fontFamily: "monospace" }}>{deviceId ?? "No disponible"}</p>
              </IonText>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}