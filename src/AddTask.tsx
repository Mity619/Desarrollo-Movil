import { useRef, useState } from "react";
import {
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonToast,
} from "@ionic/react";
import type { InputCustomEvent } from "@ionic/react";
import { addOutline } from "ionicons/icons";

interface AddTaskProps {
    onAdd: (name: string, state: boolean) => void;
}

const MAX_LENGTH = 80;

function AddTask({ onAdd }: AddTaskProps) {
    const [name, setName] = useState("");
    const [showToast, setShowToast] = useState(false);
    const inputRef = useRef<HTMLIonInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // evita recargar la página / útil si se envía con Enter
        const trimmed = name.trim();

        if (!trimmed) {
            setShowToast(true);
            return;
        }

        onAdd(trimmed, false);
        setName("");
        inputRef.current?.setFocus();
    };

    return (
        <form onSubmit={handleSubmit}>
            <IonItem>
                <IonInput
                    ref={inputRef}
                    label="Nombre de la tarea"
                    labelPlacement="floating"
                    placeholder="Ej: Comprar leche"
                    value={name}
                    clearInput
                    maxlength={MAX_LENGTH}
                    enterkeyhint="done"
                    onIonInput={(e: InputCustomEvent) =>
                        setName(e.detail.value ?? "")
                    }
                />
            </IonItem>

            <IonButton
                expand="block"
                type="submit"
                disabled={!name.trim()}
            >
                <IonIcon slot="start" icon={addOutline} />
                Agregar tarea
            </IonButton>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="El nombre no puede estar vacío"
                duration={2000}
                color="warning"
            />
        </form>
    );
}

export default AddTask;