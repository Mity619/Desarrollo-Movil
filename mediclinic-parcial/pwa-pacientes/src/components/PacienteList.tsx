import type { Paciente } from "../types";

interface Props {
  pacientes: Paciente[];
}

export default function PacienteList({ pacientes }: Props) {
  if (!pacientes.length) return <p>No hay pacientes.</p>;

  return (
    <ul className="lista">
      {pacientes.map(p => (
        <li key={p.id}>
          <strong>
            {p.nombre} {p.apellido}
          </strong>
          <span>CC: {p.cc}</span>
          <span>Tel: {p.telefono || "-"}</span>
        </li>
      ))}
    </ul>
  );
}