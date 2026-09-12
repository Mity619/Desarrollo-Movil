import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonToast
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getVisitas, updateVisita, Estado } from '../service/storage';

const SIGUIENTE: Record<Estado, Estado | null> = {
  pendiente: 'en_camino',
  en_camino: 'finalizada',
  finalizada: null
};

export default function VisitaDetalle() {
  const { id } = useParams<{ id: string }>();
  const visita = getVisitas().find(v => v.id === id);
  const [estado, setEstado] = useState<Estado>(visita?.estado || 'pendiente');
  const [toast, setToast] = useState('');

  if (!visita) return <IonPage><IonContent>No encontrada</IonContent></IonPage>;

  const avanzar = () => {
    const next = SIGUIENTE[estado];
    if (!next) return;
    updateVisita(visita.id, next);
    setEstado(next);
    setToast(`Estado cambiado a: ${next}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/visitas" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{visita.paciente}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Hora:</strong> {visita.hora}</p>
            <p><strong>Dirección:</strong> {visita.direccion}</p>
            <p><strong>Estado actual:</strong> {estado}</p>
          </IonCardContent>
        </IonCard>

        {SIGUIENTE[estado] ? (
          <IonButton expand="block" onClick={avanzar}>
            Cambiar a: {SIGUIENTE[estado]}
          </IonButton>
        ) : (
          <IonButton expand="block" color="medium" disabled>
            Visita finalizada
          </IonButton>
        )}

        <IonToast
          isOpen={!!toast} message={toast} duration={1500}
          onDidDismiss={() => setToast('')}
        />
      </IonContent>
    </IonPage>
  );
}