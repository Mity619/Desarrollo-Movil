import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonBadge
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVisitas, Visita } from '../service/storage';

const colorEstado = (e: string) =>
  e === 'pendiente' ? 'warning' : e === 'en_camino' ? 'primary' : 'success';

export default function Visitas() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const history = useHistory();

  useEffect(() => {
    setVisitas(getVisitas());
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas del día</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {visitas.map(v => (
            <IonItem
              key={v.id}
              button
              onClick={() => history.push(`/tabs/visitas/${v.id}`)}
            >
              <IonLabel>
                <h2>{v.paciente}</h2>
                <p>🕐 {v.hora} — {v.direccion}</p>
              </IonLabel>
              <IonBadge color={colorEstado(v.estado)} slot="end">
                {v.estado}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}