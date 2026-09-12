import { IonPage, IonContent, IonInput, IonButton, IonToast, IonItem, IonLabel } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { USERS, setSession } from '../service/storage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    const u = USERS.find(x => x.username === username && x.password === password);
    if (!u) { setShowToast(true); return; }
    setSession({ username: u.username });
    history.replace('/tabs/visitas');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: 360, margin: '80px auto' }}>
          <h2>MediClinic - Médico</h2>
          <IonItem>
            <IonLabel position="stacked">Usuario</IonLabel>
            <IonInput value={username} onIonInput={e => setUsername(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput type="password" value={password}
              onIonInput={e => setPassword(e.detail.value!)} />
          </IonItem>
          <IonButton expand="block" onClick={handleLogin} style={{ marginTop: 16 }}>
            Ingresar
          </IonButton>
        </div>
        <IonToast
          isOpen={showToast}
          message="Credenciales incorrectas"
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
}