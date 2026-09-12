import { useEffect, useState } from "react";
import PacienteForm from "../components/PacienteForm";
import PacienteList from "../components/PacienteList";
import type { Paciente, FormPaciente } from "../types";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pacientes");
    if (stored) setPacientes(JSON.parse(stored));
  }, []);

  const persist = (lista: Paciente[]) => {
    setPacientes(lista);
    localStorage.setItem("pacientes", JSON.stringify(lista));
  };

  const agregar = (p: FormPaciente) => {
    persist([...pacientes, { ...p, id: Date.now() }]);
  };

  const q = busqueda.trim().toLowerCase();
  const filtrados = !q
    ? pacientes
    : pacientes.filter(
        p =>
          p.nombre.toLowerCase().includes(q) ||
          p.apellido.toLowerCase().includes(q) ||
          p.cc.toLowerCase().includes(q)
      );

  return (
    <div className="pacientes">
      <PacienteForm onAgregar={agregar} />

      <div className="buscador">
        <input
          placeholder="🔍 Buscar por nombre, apellido o CC"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <PacienteList pacientes={filtrados} />
    </div>
  );
}