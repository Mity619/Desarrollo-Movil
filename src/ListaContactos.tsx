import {
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from "@ionic/react";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

function ContactList({
  contacts,
  onDelete
}: ContactListProps) {

  return (
    <IonList>

      {contacts.map((contact) => (

        <IonItem key={contact.id}>

          <IonLabel>
            <h2>{contact.name}</h2>
            <p>{contact.phone}</p>
          </IonLabel>

          <IonButton
            color="danger"
            onClick={() => onDelete(contact.id)}
          >
            Eliminar
          </IonButton>

        </IonItem>

      ))}

    </IonList>
  );
}

export default ContactList;