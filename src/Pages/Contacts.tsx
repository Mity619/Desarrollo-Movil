import { useState, useEffect} from "react";
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonSpinner, IonText, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useCollection } from "../Hooks/useCollection";
import { useNetwork } from "../Hooks/useNetwork";

export default function Contacts() {
    const [nombre, setNombre] = useState("");
    const { results, isPending, getAll, add, remove } = useCollection("contacts");
    const { isOnline } = useNetwork();

    useEffect(() => { getAll(); }, []);

    const handleAdd = async () => {

        if (!nombre.trim()) return;

        await add({ nombre });

        setNombre("");
        getAll();
    };

    return (
        <IonPage>
            <IonHeader><IonToolbar><IonTitle>Contactos (Firestore)</IonTitle></IonToolbar></IonHeader>
            <IonContent className="ion-padding">
                {!isOnline && <IonText color="danger"><p>Sin conexión. Las acciones están deshabilitadas.</p></IonText>}
                
                <IonItem style={{ "--padding-start": "0" }}>
                    <IonInput label="Nombre del contacto" value={nombre} onIonInput={(e) => setNombre(e.detail.value ?? "")} disabled={!isOnline} />
                </IonItem>
                <IonButton expand="block" onClick={handleAdd} disabled={!isOnline || isPending} className="ion-margin-top">
                    {isPending ? <IonSpinner name="crescent" /> : "Agregar Contacto"}
                </IonButton>

                <IonList className="ion-margin-top">
                    {results.map((c) => (
                        <IonItem key={c.id}>
                            <IonLabel>{c.nombre}</IonLabel>
                            <IonButton fill="clear" color="danger" onClick={() => remove(c.id)} disabled={!isOnline}>Eliminar</IonButton>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}