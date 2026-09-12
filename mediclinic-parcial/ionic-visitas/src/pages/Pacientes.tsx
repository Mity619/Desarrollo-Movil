import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel
} from '@ionic/react';

const PACIENTES = [
  { id: 1, nombre: 'Ana García', cc: '10203040' },
  { id: 2, nombre: 'Luis Pérez', cc: '50607080' }
];

export default function Pacientes() {
  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Pacientes</IonTitle></IonToolbar></IonHeader>
      <IonContent>
        <IonList>
          {PACIENTES.map(p => (
            <IonItem key={p.id}>
              <IonLabel>
                <h2>{p.nombre}</h2>
                <p>CC: {p.cc}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}