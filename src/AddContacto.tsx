import { useState } from "react";
import {
  IonItem,
  IonInput,
  IonButton
} from "@ionic/react";

interface AddContactProps {
  onAdd: (name: string, phone: string) => void;
}

function AddContact({ onAdd }: AddContactProps) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = () => {

    if (!name || !phone) {
      return;
    }

    onAdd(name, phone);

    setName("");
    setPhone("");
  };

  return (
    <>
      <IonItem>
        <IonInput
          label="Nombre"
          labelPlacement="floating"
          value={name}
          onIonInput={(e) =>
            setName(e.detail.value ?? "")
          }
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Teléfono"
          labelPlacement="floating"
          type="tel"
          value={phone}
          onIonInput={(e) =>
            setPhone(e.detail.value ?? "")
          }
        />
      </IonItem>

      <IonButton
        expand="block"
        onClick={handleAdd}
      >
        Agregar contacto
      </IonButton>
    </>
  );
}

export default AddContact;