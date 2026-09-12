import { useState} from "react";
import type { FormEvent } from "react";
import type { FormPaciente } from "../types";

interface Props {
  onAgregar: (p: FormPaciente) => void;
}

type Errores = Partial<Record<keyof FormPaciente, string>>;

const VACIO: FormPaciente = { nombre: "", apellido: "", cc: "", telefono: "" };

export default function PacienteForm({ onAgregar }: Props) {
  const [form, setForm] = useState<FormPaciente>(VACIO);
  const [errores, setErrores] = useState<Errores>({});

  const validar = (): Errores => {
    const e: Errores = {};
    if (!form.nombre.trim()) e.nombre = "Nombre requerido";
    if (!form.apellido.trim()) e.apellido = "Apellido requerido";
    if (!/^\d{6,12}$/.test(form.cc)) e.cc = "CC debe tener 6-12 dígitos";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length) return;

    onAgregar(form);
    setForm(VACIO);
  };

  const set = (k: keyof FormPaciente, v: string) =>
    setForm({ ...form, [k]: v });

  return (
    <form onSubmit={handleSubmit} className="form-paciente">
      <h3>Agregar paciente</h3>
      <div className="grid">
        <div>
          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={e => set("nombre", e.target.value)}
          />
          {errores.nombre && <small className="error">{errores.nombre}</small>}
        </div>
        <div>
          <input
            placeholder="Apellido"
            value={form.apellido}
            onChange={e => set("apellido", e.target.value)}
          />
          {errores.apellido && <small className="error">{errores.apellido}</small>}
        </div>
        <div>
          <input
            placeholder="CC"
            value={form.cc}
            onChange={e => set("cc", e.target.value)}
          />
          {errores.cc && <small className="error">{errores.cc}</small>}
        </div>
        <div>
          <input
            placeholder="Teléfono"
            value={form.telefono}
            onChange={e => set("telefono", e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}