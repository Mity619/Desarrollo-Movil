import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardContent
} from '@ionic/react';
import { useHistory } from 'react-router';
import { getSession, clearSession } from '../service/storage';

export default function Perfil() {
  const session = getSession();
  const history = useHistory();

  const logout = () => {
    clearSession();
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Perfil</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h2>👨‍⚕️ {session?.username}</h2>
            <p>Médico general</p>
          </IonCardContent>
        </IonCard>
        <IonButton expand="block" color="danger" onClick={logout}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}