import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import { useMissions } from "../Context/MissionsContext";
import { useAuth } from "../Context/AuthContext";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Ranking() {
  const { ranking, progress } = useMissions();
  const { user } = useAuth();
  const userInTop = ranking.some((u) => u.uid === user?.uid);

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Ranking Top 5</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {ranking.map((u, i) => {
            const isMe = u.uid === user?.uid;
            return (
              <IonItem key={u.uid} color={isMe ? "light" : undefined}>
                <IonLabel>
                  <h2>{MEDALS[i] ?? `#${i + 1}`} {u.email?.split("@")[0]} {isMe && "(tú)"}</h2>
                </IonLabel>
                <IonLabel slot="end" className="ion-text-end">
                  <h2>{u.points} pts</h2>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>

        {!userInTop && (
          <>
            <h3 className="ion-margin-top">Tu posición</h3>
            <IonList>
              <IonItem color="light">
                <IonLabel>
                  <h2>{user?.email?.split("@")[0]} (tú)</h2>
                </IonLabel>
                <IonLabel slot="end" className="ion-text-end">
                  <h2>{progress.points} pts</h2>
                </IonLabel>
              </IonItem>
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}