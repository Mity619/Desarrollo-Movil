import { useState } from "react";
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonSpinner, IonText, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useRealTimeCollection } from "../Hooks/useRealTimeCollection";
import { useNetwork } from "../Hooks/useNetwork";

export default function Tasks() {
    const [task, setTask] = useState("");
    const { results, isPending, add, remove } = useRealTimeCollection("tasks");
    const { isOnline } = useNetwork();

    const handleAdd = async () => {

        if (!task.trim()) return;
        await add({ task });
        setTask("");
        
    };

    return (
        <IonPage>
            <IonHeader><IonToolbar><IonTitle>Tareas (Realtime)</IonTitle></IonToolbar></IonHeader>
            <IonContent className="ion-padding">
                {!isOnline && <IonText color="danger"><p>Sin conexión. Las acciones están deshabilitadas.</p></IonText>}

                <IonItem style={{ "--padding-start": "0" }}>
                    <IonInput label="Nueva tarea" value={task} onIonInput={(e) => setTask(e.detail.value ?? "")} disabled={!isOnline} />
                </IonItem>
                <IonButton expand="block" onClick={handleAdd} disabled={!isOnline || isPending} className="ion-margin-top">
                    {isPending ? <IonSpinner name="crescent" /> : "Agregar Tarea"}
                </IonButton>

                <IonList className="ion-margin-top">
                    {results.map((t) => (
                        <IonItem key={t.id}>
                            <IonLabel>{t.task}</IonLabel>
                            <IonButton fill="clear" color="danger" onClick={() => remove(t.id)} disabled={!isOnline}>Eliminar</IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}