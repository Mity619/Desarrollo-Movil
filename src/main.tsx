import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import Loader from "./Loader";
import ContactList from "./ListaContactos";
import AddContact from "./AddContacto.tsx";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

function Main() {

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulación carga inicial
  useEffect(() => {

    setTimeout(() => {
      setContacts([
        { id: 1, name: "Juan", phone: "123456" },
        { id: 2, name: "Ana", phone: "987654" }
      ]);

      setLoading(false);

    }, 2000);

  }, []);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone
    };

    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts(prev =>
      prev.filter(contact => contact.id !== id)
    );
  };

  return (
    <>
      <h1>Contact List</h1>

      {
        loading
          ? <Loader />
          : <>
              <AddContact onAdd={addContact} />
              <ContactList
                contacts={contacts}
                onDelete={deleteContact}
              />
            </>
      }
    </>
  );
}

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.log("Error:", err));
  });
}