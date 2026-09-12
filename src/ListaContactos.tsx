interface Contacto {
  id: number;
  name: string;
  phone: string;
}

interface Props {
  contacts: Contacto[];
  onDelete: (id: number) => void;
}

function listaContactos({ contacts, onDelete }: Props) {
  return (
    <ul>
      {
        contacts.map(contacto => (
          <li key={contacto.id}>
            {contacto.name} - {contacto.phone}
            <button onClick={() => onDelete(contacto.id)}>
              Eliminar
            </button>
          </li>
        ))
      }
    </ul>
  );
}

export default listaContactos;