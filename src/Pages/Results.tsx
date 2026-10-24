import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonIcon } from "@ionic/react";
import { trophyOutline, checkmarkCircle, closeCircle } from "ionicons/icons";
import { useMissions } from "../Context/MissionsContext";

export default function Results() {
  const { progress, missions, completedCount, totalMissions } = useMissions();
  const allDone = completedCount === totalMissions;

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Resultados</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", paddingTop: 24 }}>
          <IonIcon icon={trophyOutline} style={{ fontSize: 64, color: "gold" }} />
          <h1 style={{ fontSize: 48, margin: "8px 0" }}>{progress.points}</h1>
          <IonText color="medium"><p>Puntos totales</p></IonText>
        </div>

        <div style={{ marginTop: 24 }}>
          <h2>{completedCount}/{totalMissions} misiones completadas</h2>
          <IonText color={allDone ? "success" : "warning"}>
            <p>{allDone ? "¡Felicidades, completaste todas las misiones!" : "Aún tienes misiones pendientes"}</p>
          </IonText>
        </div>

        <div style={{ marginTop: 16 }}>
          {missions.map((m) => {
            const done = progress.missions[String(m.id)];
            return (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                <IonIcon icon={done ? checkmarkCircle : closeCircle}
                  color={done ? "success" : "medium"} style={{ fontSize: 24 }} />
                <span>{m.title}</span>
              </div>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
}