export interface User {
  username: string;
}

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  cc: string;
  telefono: string;
}

export type FormPaciente = Omit<Paciente, "id">;