import { useState } from "react";
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useDexie } from "../Hooks/useDexie";

export default function Fruits() {
    const [fruit, setFruit] = useState("");
    const { results, add, remove } = useDexie("frutas");

    const handleAdd = async () => {
        if (!fruit.trim()) return;
        await add({ nombre: fruit });
        setFruit("");
    };

    return (
        <IonPage>
            <IonHeader><IonToolbar><IonTitle>Frutas (Dexie - Offline)</IonTitle></IonToolbar></IonHeader>
            <IonContent className="ion-padding">
                {/* No requiere validación de red, funciona siempre */}
                <IonItem style={{ "--padding-start": "0" }}>
                    <IonInput label="Nombre de la fruta" value={fruit} onIonInput={(e) => setFruit(e.detail.value ?? "")} />
                </IonItem>
                <IonButton expand="block" onClick={handleAdd} className="ion-margin-top">
                    Agregar Fruta
                </IonButton>

                <IonList className="ion-margin-top">
                    {results.map((f) => (
                        <IonItem key={f.id}>
                            <IonLabel>{f.nombre}</IonLabel>
                            <IonButton fill="clear" color="danger" onClick={() => remove(f.id)}>Eliminar</IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}