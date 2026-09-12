import { useState } from "react";

interface Props {
  onAdd: (name: string, phone: string) => void;
}

function AddContact({ onAdd }: Props) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAdd(name, phone);
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Teléfono"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddContact;